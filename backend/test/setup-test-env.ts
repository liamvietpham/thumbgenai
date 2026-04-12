export const TEST_ACCESS_TOKEN_SECRET = 'test-access-secret';
export const TEST_REFRESH_TOKEN_SECRET = 'test-refresh-secret';
export const TEST_ACCESS_TOKEN_TTL = '15m';
export const TEST_REFRESH_TOKEN_TTL = '7d';

const TEST_GCP_SERVICE_ACCOUNT_KEY = JSON.stringify({
  type: 'service_account',
  project_id: 'thumbgen-test',
  private_key_id: 'test-private-key-id',
  private_key: '-----BEGIN PRIVATE KEY-----\nTEST\n-----END PRIVATE KEY-----\n',
  client_email: 'vertex@test.iam.gserviceaccount.com',
  client_id: 'test-client-id',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url: 'https://example.com/cert',
});

export function setupTestEnv() {
  process.env.NODE_ENV = 'test';
  process.env.AWS_REGION = 'ap-southeast-1';
  process.env.AWS_ACCESS_KEY_ID = 'test-access-key';
  process.env.AWS_SECRET_ACCESS_KEY = 'test-secret-key';
  process.env.AWS_BUCKET_NAME = 'thumbgen-bucket';
  process.env.AWS_CLOUDFRONT_DOMAIN = 'https://cdn.example.com';
  process.env.USERS_TABLE = 'users-test';
  process.env.SESSIONS_TABLE = 'sessions-test';
  process.env.THUMBNAILS_TABLE = 'thumbnails-test';
  process.env.ACCESS_TOKEN_SECRET = TEST_ACCESS_TOKEN_SECRET;
  process.env.REFRESH_TOKEN_SECRET = TEST_REFRESH_TOKEN_SECRET;
  process.env.ACCESS_TOKEN_TTL = TEST_ACCESS_TOKEN_TTL;
  process.env.REFRESH_TOKEN_TTL = TEST_REFRESH_TOKEN_TTL;
  process.env.CORS_ORIGIN = 'http://localhost:3000';
  process.env.GOOGLE_CLOUD_PROJECT = 'thumbgen-test';
  process.env.GOOGLE_CLOUD_LOCATION = 'global';
  process.env.VERTEX_AI_TIMEOUT_MS = '20000';
  process.env.GCP_SERVICE_ACCOUNT_KEY = TEST_GCP_SERVICE_ACCOUNT_KEY;
  delete process.env.VERTEX_AI_KEY;
}
