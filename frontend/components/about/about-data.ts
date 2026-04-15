export type ImpactItem = {
  title: string;
  description: string;
  tone: 'secondary' | 'primary' | 'tertiary';
};

export type ArchitecturePoint = {
  title: string;
  description: string;
};

export type OptimizationCard = {
  title: string;
  description: string;
  tone: 'secondary' | 'tertiary';
};

export const heroAvatars = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5mmiC8SJjyryMK72wvgUymA6RCNPubYIQycxej2kNM4WvhG6a4guJNp96kMC4gKTD2OKoUKYTprughOtKU67nE_avPH_8TTVoy3IT0YuIFAEHo_ADUxMe4a0-ZcODyjLOEUmLBr2dbTUCeeBjm6k9SL281pynXqdUTM7eElX2hz8DUoPv04x0-L4SJpxv7d5jn0KZW6OYlhmzKjyvCrNC7euA6n3UiHXumK4n1K0YNszYC0BClsPhqxdO8Mx5g3X7S-yVHAM5OnF0',
    alt: 'Portrait of a creator in a studio setting',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpPTqU4pD35CaHFlX1-9C_2_QVAQtYrsQTZfuZD9_Gqgs_62i4IOcBndwggMxDje2_5xnjS3z3Np2jDOSxQ61bRW9jHvTJ2HR_a4q1s7BsAcjiVwFOLXkuePgPwgIR8HCk5xTMdk3F-huU-s_i9DvXLg4UrP1UrM9mDWeY0syeQAB0JOKMin-nyZmVouIqh-xTZY9FlhQp3llZiDgzGeeq4lYr9S1PZFjiPw0N7_xtBhLgePFr1nhjRNhkGc9cfm-Xh1NM4gpXKIIs',
    alt: 'Portrait of a digital artist in a minimalist studio',
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOFK20JZWSTKamm8AzMVd0opo-pJxq0OmAr9oj-nUJSLI8wtTL6sH4XINpI9QWqRDnbYR6X28BdvY3SIXfI6o8PbEKFKwpx7ffe0VznvNwQ6SLcngMX6ChMtBoxE0qhICO82UDvoonZ0hL2LQ6q_FDrW09jyzEQQSS79N0xQhUDON_-qNLaeOESe93eratN-ZzE9mOtdv8NJt0y9q4qaE9RqX4mWv13hKviay8uAjSVIDYLQsAfp7CNDUHXRGlzonzu7wJiIY3EdZi',
    alt: 'Portrait of a smiling content creator outdoors',
  },
];

export const impactItems: ImpactItem[] = [
  {
    title: '5M+ Thumbnails Generated',
    description:
      'Creators around the world use Thumbnail AI to turn rough ideas into polished, high-performing visuals at scale.',
    tone: 'secondary',
  },
  {
    title: 'Average 12% CTR Increase',
    description:
      'Our workflows are shaped around attention signals, contrast, composition, and the details that help thumbnails earn the click.',
    tone: 'primary',
  },
  {
    title: '100k+ Active Creators',
    description:
      'From solo channels to creative teams, our community keeps pushing what modern thumbnail storytelling can look like.',
    tone: 'tertiary',
  },
];

export const architecturePoints: ArchitecturePoint[] = [
  {
    title: 'Neural style mapping',
    description:
      'Align brand aesthetics with current visual trends while preserving recognisable creative identity.',
  },
  {
    title: 'Attention heatmaps',
    description:
      'Estimate where viewers notice first so the most important faces, text, and focal points land clearly.',
  },
];

export const optimizationCards: OptimizationCard[] = [
  {
    title: 'Visual Heatmaps',
    description:
      'Model audience attention before you publish, so your thumbnail hierarchy works on mobile and desktop at a glance.',
    tone: 'secondary',
  },
  {
    title: 'Neural Style Mapping',
    description:
      'Adapt your brand language to high-performing thumbnail patterns without flattening everything into one generic look.',
    tone: 'tertiary',
  },
];
