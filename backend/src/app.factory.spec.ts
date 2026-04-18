import { parseCorsOrigins } from './app.factory';

describe('parseCorsOrigins', () => {
  it('returns undefined for empty values', () => {
    expect(parseCorsOrigins()).toBeUndefined();
    expect(parseCorsOrigins('')).toBeUndefined();
    expect(parseCorsOrigins('   ')).toBeUndefined();
  });

  it('returns a single origin as an array', () => {
    expect(parseCorsOrigins('http://localhost:3000')).toEqual(['http://localhost:3000']);
  });

  it('returns an array for comma-separated origins', () => {
    expect(parseCorsOrigins('http://localhost:3000, https://app.example.com')).toEqual([
      'http://localhost:3000',
      'https://app.example.com'
    ]);
  });
});
