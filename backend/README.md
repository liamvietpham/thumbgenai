# Backend

Minimal NestJS backend baseline for `thumbgen-ai`.

## Current structure

- `src/app.module.ts`: root module that only aggregates feature modules
- `src/app.factory.ts`: shared app bootstrap for local runtime and Lambda
- `src/health`: minimal health-check module
- `src/main.ts`: local HTTP entrypoint
- `src/lambda.ts`: AWS Lambda entrypoint via `@vendia/serverless-express`

## Scripts

```bash
yarn install
yarn start:dev
yarn test
yarn test:e2e
yarn deploy
```

## API

- `GET /health`: basic health response for smoke checks and infrastructure probes

## Auth - Register flow (current)

- Endpoint: `POST /auth/register`
- Input: `name`, `email`, `password`, `confirmPassword`

Flow:

1. Validate and transform input in `RegisterDto`
   - `name`: `trim()` and collapse multiple spaces.
   - `email`: `trim().toLowerCase()`.
2. Check `password === confirmPassword`.
3. Best-effort check existing email via `email-index` (`findByEmail`).
4. Hash password with `argon2id`.
5. Create user using one DynamoDB `TransactWrite` call:
   - Put user item (`id = uuidv7()`), condition: `attribute_not_exists(id)`.
   - Put email-lock item (`id = email#<normalizedEmail>`), condition: `attribute_not_exists(id)`.
6. If transaction fails due to conditional check, map to `ConflictException('User already exists')`.

Important note:

- Step 3 alone cannot prevent race condition.
- Real uniqueness guarantee is enforced at step 5 by conditional write in a transaction.

## Register race condition (duplicate email) - possible strategies

Below are practical approaches, not only the one currently used.

1. Current approach: transaction + email-lock item in same table
   - Idea: keep `users` by `id`, add one lock item per normalized email.
   - Guarantee: strong, atomic uniqueness per email.
   - Tradeoff: extra item per user and mixed item types in one table.

2. Make `email` the table primary key and use conditional `PutItem`
   - Idea: user record key is `email`; create with `attribute_not_exists(pk)`.
   - Guarantee: strong uniqueness with single write.
   - Tradeoff: harder to change email and less convenient if `id` is the main lookup key.

3. Keep `users` table keyed by `id`, and add a separate `user_email_unique` table
   - Idea: reserve email in dedicated table (`PK = normalizedEmail`) with conditional write; then create user.
   - Best practice: use transaction across both tables to keep atomicity.
   - Tradeoff: more infrastructure and cross-table transaction logic.

4. Transaction with `ConditionCheck` on a unique-email record
   - Idea: same as lock pattern, but explicit `ConditionCheck` + writes in one transaction.
   - Guarantee: strong uniqueness.
   - Tradeoff: still needs a record that represents uniqueness ownership.

5. Check-then-insert using GSI only (`Query` before write)
   - Idea: query `email-index`, if not found then insert user.
   - Guarantee: weak; vulnerable to race.
   - Note: GSI does not enforce unique constraints and is eventually consistent.
   - Recommendation: never use this alone for strict uniqueness.

6. Distributed lock (Redis/DynamoDB lock client) around register flow
   - Idea: acquire lock on `normalizedEmail`, then create user.
   - Guarantee: depends on lock correctness and timeout handling.
   - Tradeoff: operational complexity and risk of stale locks.

7. Queue-based serialization (single writer per email)
   - Idea: push register requests to queue, process sequentially by email key.
   - Guarantee: can avoid race at processor level.
   - Tradeoff: async flow, higher latency, more moving parts.

8. Idempotency key for retry-safe API (supporting strategy)
   - Idea: client sends idempotency key; server deduplicates repeated same request.
   - Benefit: prevents duplicate creates from retries/timeouts.
   - Limitation: does not replace unique-email constraint; should be combined with one of strategies 1-4.

9. Use relational DB unique index as source of truth
   - Idea: enforce `UNIQUE(email)` in PostgreSQL/MySQL, then sync/read from DynamoDB if needed.
   - Guarantee: strong uniqueness managed by DB engine.
   - Tradeoff: additional datastore and consistency architecture.

## Recommended choices

- If staying on DynamoDB with `id` as user PK: use strategy 1 or 3/4.
- If product treats email as immutable natural key: strategy 2 is simplest.
- Do not rely only on pre-check query (`findByEmail`) to enforce uniqueness.

## Notes for new modules

- Add each feature as its own module under `src/<feature>`
- Import new modules from `AppModule`
- Keep shared bootstrap concerns inside `app.factory.ts` so `main.ts` and `lambda.ts` stay aligned
