import { COMMUNITY_ITEMS } from '@/components/thumbnails/thumbnails-data';

export const AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBP5JL-q8S81neZg6rhbnJ-m92v7tcUi4_IMmOl0p9_h0xL4EnrYnhShra1gL84xckpINItAUEHp-6JhFjSLN2Fo5Y6Ggn2oCQ4yMPppwcXE6KxUNQycJgP7UCdunTGcSS8k4mzx09ZE_7MFIt9Ecwldc-LHbD_3jDyWf5A8wV_I2euDLPIMiPW5YxaGbo21VZO_TL6CkSeASrBMM-5hwzg4rV7VytBRkdWQqnSauggr5eB2IbNNs1lKw5lzoYeXnV_gzy4vf5ncYhW';

export const BILLING = [
  { id: 1, label: 'Professional Pack', date: 'Oct 12, 2026', credits: '+500 Credits', amount: '$39.99' },
  { id: 2, label: 'Starter Bundle',    date: 'Sep 05, 2026', credits: '+100 Credits', amount: '$9.99'  },
  { id: 3, label: 'Professional Pack', date: 'Aug 01, 2026', credits: '+500 Credits', amount: '$39.99' },
  { id: 4, label: 'Starter Bundle',    date: 'Jun 18, 2026', credits: '+100 Credits', amount: '$9.99'  },
  { id: 5, label: 'Professional Pack', date: 'May 03, 2026', credits: '+500 Credits', amount: '$39.99' },
  { id: 6, label: 'Starter Bundle',    date: 'Mar 22, 2026', credits: '+100 Credits', amount: '$9.99'  },
];

export const BILLING_PREVIEW_COUNT = 2;

export const USAGE = [
  { time: '10:24 AM',   label: 'deep seek vs chat gpt',          cost: '-1 Credit'  },
  { time: '09:12 AM',   label: 'Learn Python in 5 Hours',        cost: '-1 Credit'  },
  { time: 'Yesterday',  label: 'best moisturizer for oily skin',  cost: '-2 Credits' },
];

export const MY_ITEMS = COMMUNITY_ITEMS.slice(0, 4);
