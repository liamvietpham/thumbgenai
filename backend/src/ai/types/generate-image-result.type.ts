export type GenerateImageResult = {
  provider: 'vertex';
  model?: string;
  text: string | null;
  images: Array<{
    mimeType: string;
    base64: string;
  }>;
};
