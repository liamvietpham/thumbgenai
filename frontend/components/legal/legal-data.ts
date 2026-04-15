export type PrivacySectionId =
  | 'data-collection'
  | 'usage-rights'
  | 'api-policy'
  | 'cookies';

export type PrivacySection = {
  id: PrivacySectionId;
  title: string;
  summary: string;
  paragraphs: string[];
  bullets?: Array<{ label: string; text: string }>;
  callout?: {
    title: string;
    body: string;
  };
};

export const privacySections: PrivacySection[] = [
  {
    id: 'data-collection',
    title: 'Data collection',
    summary: 'What information we collect to operate the product and support your workspace.',
    paragraphs: [
      'We collect the information needed to create accounts, process thumbnail requests, secure sessions, and support billing, support, and reliability workflows.',
      'The exact data collected depends on how you use Thumbnail AI, including whether you upload assets, generate thumbnails, connect payment details, or contact support.',
    ],
    bullets: [
      {
        label: 'Account details',
        text: 'Name, email address, authentication identifiers, and subscription or billing state.',
      },
      {
        label: 'Uploaded assets',
        text: 'Images, prompts, brand references, and editing context you provide to generate or recreate thumbnails.',
      },
      {
        label: 'Product usage',
        text: 'Request history, feature interactions, device and browser details, and security logs.',
      },
    ],
    callout: {
      title: 'Privacy commitment',
      body: 'We do not sell personal data or uploaded creative assets to advertisers. Your workspace data is used to operate the service, protect the platform, and support the features you request.',
    },
  },
  {
    id: 'usage-rights',
    title: 'Usage rights',
    summary: 'How your uploaded assets, generated outputs, and privacy requests are handled.',
    paragraphs: [
      'You retain rights to the assets you upload and, subject to applicable law and platform terms, to the outputs generated for your account. We do not make your uploads public unless a product feature explicitly asks you to share them.',
      'Depending on your location, you may also have rights to access, correct, export, or delete personal data associated with your account. We may need to verify identity before fulfilling certain requests.',
    ],
    bullets: [
      {
        label: 'Ownership',
        text: 'Your account remains the primary workspace for uploaded assets and generated thumbnails created through the service.',
      },
      {
        label: 'Access requests',
        text: 'You can contact support to request access, correction, export, or deletion of your personal data.',
      },
      {
        label: 'Responsible use',
        text: 'You are responsible for ensuring prompts and uploaded materials do not infringe the rights of others or violate applicable law.',
      },
    ],
  },
  {
    id: 'api-policy',
    title: 'API policy',
    summary: 'How API access should be used and how API request data is handled.',
    paragraphs: [
      'API access is intended for approved integrations and automation workflows that interact with Thumbnail AI on behalf of the account owner. API traffic may be logged for security, abuse prevention, and operational reliability.',
      'You are responsible for protecting API credentials, respecting rate limits, and ensuring that data sent through programmatic integrations is authorized for processing.',
    ],
    bullets: [
      {
        label: 'Rate limits',
        text: 'Standard API access may be subject to throughput controls to protect platform stability and fair usage.',
      },
      {
        label: 'Credential security',
        text: 'Keep API keys private and rotate them if you suspect unauthorized access or leakage.',
      },
      {
        label: 'Developer responsibility',
        text: 'Integrations must comply with privacy expectations, platform rules, and any obligations tied to end-user consent.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    summary: 'How sessions and preferences are remembered.',
    paragraphs: [
      'We use essential cookies and local storage to maintain secure sessions, remember preferences, and support core product functionality.',
      'Where applicable, analytics or functional technologies help us understand performance and improve usability without changing the core privacy commitment described above.',
    ],
    bullets: [
      {
        label: 'Essential cookies',
        text: 'Required for login state, account security, and consistent navigation inside the app.',
      },
      {
        label: 'Preference storage',
        text: 'Used for remembering interface choices, recently used styles, and similar product settings.',
      },
    ],
  },
];
