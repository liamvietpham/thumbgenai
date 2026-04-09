export type GenerateImageInput = {
  prompt: string;
  aspectRatio?: '1:1' | '3:2' | '4:5' | '9:16' | '16:9';
  model?: string;
};
