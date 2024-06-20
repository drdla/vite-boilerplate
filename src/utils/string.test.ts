import { describe, expect, it } from 'vitest';

import { trimSlash } from './string';

describe('trimSlash', () => {
  it('should remove all slashes from the start of the string', () => {
    expect(trimSlash('/foo/bar')).toEqual('foo/bar');
    expect(trimSlash('//foo/bar')).toEqual('foo/bar');
  });
  it('should remove all slashes from the end of the string', () => {
    expect(trimSlash('foo/bar/')).toEqual('foo/bar');
    expect(trimSlash('foo/bar//')).toEqual('foo/bar');
  });
  it('should remove all slashes from the start and the end of the string', () => {
    expect(trimSlash('/foo/bar/')).toEqual('foo/bar');
    expect(trimSlash('//foo/bar//')).toEqual('foo/bar');
  });
  it('should keep slashes in the middle of the string', () => {
    expect(trimSlash('foo/bar')).toEqual('foo/bar');
    expect(trimSlash('foo/bar//baz')).toEqual('foo/bar//baz');
    expect(trimSlash('/ /foo/ /bar/ /')).toEqual(' /foo/ /bar/ ');
  });
});
