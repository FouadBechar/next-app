// Minimal TypeScript declarations for Google reCAPTCHA v3 global `grecaptcha`.
// Keeps types strict enough for execute/ready usage in the app without pulling
// external @types packages. If you prefer more complete types, install
// `npm i -D @types/grecaptcha` or expand these declarations.

interface Grecaptcha {
  execute(siteKey: string, options?: { action?: string }): Promise<string>;
  ready?(cb: () => void): void;
}

declare const grecaptcha: Grecaptcha;
