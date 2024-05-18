import { SubstringPipe } from './substring.pipe';

describe('SubstringPipe', () => {
  let pipe: SubstringPipe;
  beforeEach(() => {
    pipe = new SubstringPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return a string with end of overflow', () => {
    const result = pipe.transform('String', 2, '...');
    expect(result).toContain('...');
  });

  it('should return a string with max length of', () => {
    const result = pipe.transform('String', 2);
    expect(result.length).toBe(2);
  });

  it('should return a string', () => {
    const result = pipe.transform('String', 1);
    expect(typeof result).toBe('string');
  });

  it('should return the entire string if smaller', () => {
    const result = pipe.transform('Str', 3);
    expect(result).toBe('Str');
  });
});
