export function generateFileName(title: string, mimeType: string): string {
  const baseName = title
    .replace(/\.[^.]+$/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .join('-');
  const extension = mimeType.split('/')[1] || 'png';

  return `${baseName}.${extension}`;
}
