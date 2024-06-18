export const trimSlash = (str: string): string =>
  str ? str.replace(/^\/+|\/+$/g, '') : '';
