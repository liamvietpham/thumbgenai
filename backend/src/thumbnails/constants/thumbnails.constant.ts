import { HarmBlockThreshold, HarmCategory } from '@google/genai';

export const THUMBNAIL_MODEL = 'gemini-2.5-flash-image';

export const STYLE_PROMPTS = {
  bold_and_graphic:
    'bold graphic design, high contrast, large readable text, thick outlines, strong shadows, eye-catching composition, youtube thumbnail style, exaggerated elements, dramatic lighting, high saturation',

  tech_futuristic:
    'futuristic technology style, glowing elements, holographic UI, cyberpunk vibes, sleek surfaces, neon reflections, digital atmosphere, sci-fi lighting, high detail, modern tech aesthetic',

  minimalist:
    'minimalist design, clean layout, lots of negative space, simple shapes, limited elements, elegant composition, soft lighting, modern flat design',

  photorealistic:
    'ultra realistic photo, cinematic lighting, high detail, realistic textures, depth of field, professional photography, sharp focus, natural colors',

  illustrated:
    'digital illustration, hand-drawn style, stylized characters, smooth shading, vibrant and clean lines, cartoon or semi-realistic illustration, creative and expressive'
};

export const COLOR_SCHEME_DESCRIPTIONS = {
  vibrant: 'vibrant colors, highly saturated, colorful, bright tones, strong contrast',

  sunset: 'warm sunset palette, orange, pink, red, golden tones, soft gradient lighting',

  forest: 'natural forest colors, green tones, earthy browns, organic and calm palette',

  neon: 'neon colors, glowing lights, electric blue, hot pink, purple highlights, dark background',

  purple: 'purple dominant palette, violet, lavender, deep purple tones, soft glow',

  monochrome:
    'monochrome color scheme, single color variations, black and white or grayscale, high contrast',

  ocean: 'ocean palette, blue, teal, turquoise, fresh and cool tones',

  pastel: 'pastel colors, soft tones, light pink, baby blue, mint green, smooth and gentle look'
};

export const THUMBNAIL_GENERATION_CONFIG = {
  maxOutputTokens: 32768,
  temperature: 1,
  topP: 0.95,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.OFF
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.OFF
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.OFF
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.OFF
    }
  ]
};
