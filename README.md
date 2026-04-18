# Thumbgen AI

Thumbgen AI is split into two apps:

- `frontend`: a Next.js 16 marketing + product UI
- `backend`: a NestJS 11 API prepared for local development and AWS Lambda deployment

The repository is not configured as a single workspace. Install and run each app from its own folder.

## Project Structure

```text
thumbgen-ai/
├── frontend/   # Next.js app
└── backend/    # NestJS + Serverless API
```

## Current Status

### Frontend

- Landing page and marketing pages are implemented
- `/generate` is a demo UI and currently uses a simulated delay plus a local placeholder image
- `/community` renders a static gallery of remote images
- `/login` and `/register` are presentational forms and are not wired to the backend yet

### Backend

- `GET /health` is available
- `POST /auth/register` is implemented
- Response payloads are wrapped in a common format:

```json
{
  "success": true,
  "statusCode": 200,
  "data": {}
}
```

Error responses follow the same pattern with `success: false`.

## Prerequisites

- Node.js `>= 20.9.0`
- Yarn 1.x
- AWS credentials for backend flows that touch DynamoDB

Why Node 20.9+:

- `frontend` uses Next.js 16.2.2, which requires Node.js `>= 20.9.0`
- `backend` is deployed with `nodejs22.x` in Serverless
- `backend/serverless.ts` is the Serverless config file

## Install Dependencies

Install each app separately:

```bash
cd frontend
yarn install
```

```bash
cd backend
yarn install
```

## Run Locally

Open two terminals.

### 1. Start the backend

Create `backend/.env` or export environment variables in your shell:

```bash
AWS_REGION=ap-southeast-1
USERS_TABLE=thumbgen-users-dev
PORT=4000
```

Then run:

```bash
cd backend
yarn start:dev
```

The API will be available at `http://localhost:4000`.

### 2. Start the frontend

```bash
cd frontend
yarn dev
```

The app will be available at `http://localhost:3000`.

## DynamoDB Requirements

The current registration flow expects a DynamoDB table with:

- Table partition key: `id` (`String`)
- Global secondary index: `email-index`
- `email-index` partition key: `email` (`String`)

The register flow writes:

- one user item with `id`, `name`, `email`, `password`, `credits`, timestamps
- one email lock item with `id = email#<email>`

The backend queries users by email through the `email-index` GSI.

## Backend Environment Variables

Minimum variables for local development:

```bash
AWS_REGION=ap-southeast-1
USERS_TABLE=thumbgen-users-dev
PORT=4000
```

Notes:

- `ConfigModule.forRoot()` is enabled, so `backend/.env` works
- successful register requests require valid AWS credentials and a real DynamoDB table
- routes that do not touch DynamoDB, such as `GET /health`, can run without `USERS_TABLE`

## API Endpoints

### `GET /health`

Example success response:

```json
{
  "success": true,
  "statusCode": 200,
  "data": {
    "status": "ok",
    "service": "thumbgen-ai-backend"
  }
}
```

### `POST /auth/register`

Request body:

```json
{
  "name": "Viet Pham",
  "email": "viet@example.com",
  "password": "password-123",
  "confirmPassword": "password-123"
}
```

Example success response:

```json
{
  "success": true,
  "statusCode": 201,
  "data": {
    "id": "0195f2b2-....",
    "name": "Viet Pham",
    "email": "viet@example.com",
    "credits": 15,
    "createdAt": "2026-04-07T00:00:00.000Z",
    "updatedAt": "2026-04-07T00:00:00.000Z",
    "pwdUpdatedAt": "2026-04-07T00:00:00.000Z"
  }
}
```

Example validation error:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Password confirmation does not match"
}
```

## Scripts

### Frontend

```bash
cd frontend
yarn dev
yarn lint
yarn build
yarn start
```

### Backend

```bash
cd backend
yarn start:dev
yarn lint
yarn test
yarn test:e2e
yarn build
```

## Deployment Notes

Backend deployment uses Serverless Framework:

```bash
cd backend
yarn deploy
```

Current deployment config expects:

- AWS runtime: `nodejs22.x`
- region from `AWS_REGION` or `ap-southeast-1`
- SSM parameter: `/thumbgenai/users-table`
- Serverless config file: [`backend/serverless.ts`](/Users/vietpham/Documents/study/thumbgen-ai/backend/serverless.ts)

## Review Notes

Important current gaps observed during review:

- the frontend auth forms are still UI-only and do not call the backend register endpoint
- the frontend register form does not collect `confirmPassword`, while the backend API currently requires it
- the community download button fetches third-party image URLs in the browser, which can fail if the remote host blocks CORS

## Verification

Verified locally in this repository:

- backend `yarn test`
- backend `yarn lint`
- backend `yarn build`
- frontend `yarn lint`

Frontend `yarn build` currently requires Node.js `>= 20.9.0`.
