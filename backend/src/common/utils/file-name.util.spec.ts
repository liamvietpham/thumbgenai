import { generateFileName } from './file-name.util';

describe('generateFileName', () => {
  it('normalizes accented characters and appends the mime extension', () => {
    expect(generateFileName('Ảnh thumbnail đẹp', 'image/png')).toBe('anh-thumbnail-dep.png');
  });

  it('replaces an existing extension instead of duplicating it', () => {
    expect(generateFileName('ảnh đẹp.png', 'image/webp')).toBe('anh-dep.webp');
  });
});
