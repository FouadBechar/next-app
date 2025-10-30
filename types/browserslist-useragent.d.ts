declare module 'browserslist-useragent' {
  export interface MatchesUAOptions {
    browsers: string[] | string;
    allowHigherVersions?: boolean;
    ignoreMinor?: boolean;
    // other options are possible but omitted for simplicity
  }

  /**
   * Check whether a user-agent string matches the provided browsers list.
   * Returns true when the UA is considered supported.
   */
  export function matchesUA(ua: string, options: MatchesUAOptions): boolean;

  export default { matchesUA };
}
