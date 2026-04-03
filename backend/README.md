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

## Notes for new modules

- Add each feature as its own module under `src/<feature>`
- Import new modules from `AppModule`
- Keep shared bootstrap concerns inside `app.factory.ts` so `main.ts` and `lambda.ts` stay aligned
