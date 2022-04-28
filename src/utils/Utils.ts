/**
 * Create params from entries
 * @function makeParams
 * @param {[string, string][]} entries - Array of entries
 * @return {string}
 *
 * @example
 * const obj = { a: '1', b: '2' };
 *
 * const entries = Object.entries(obj);
 *
 * const params = createParams(entries); // a=1&b=2
 */
export function makeParams(entries: [string, string][]): string {
  const params = entries
      .filter(([, value]) => typeof value != 'undefined')
      .map(([key, value]) => `${key}=${value}`).join('&');

  return params ? `?${params}` : '';
};
