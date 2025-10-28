"use client";

import { useEffect } from "react";

/**
 * Client-only cleanup component to remove reCAPTCHA script/badge and global state
 * when the login page unmounts (client-side navigation). Place this inside the
 * login page so cleanup is scoped to that page's lifecycle.
 */
export default function RecaptchaCleanup() {
  useEffect(() => {
    return () => {
      try {
        const script = document.getElementById("recaptcha-v3");
        if (script && script.parentNode) script.parentNode.removeChild(script);

        const badges = document.querySelectorAll(".grecaptcha-badge");
        badges.forEach((el) => el.remove());

        // @ts-ignore
        if ((window as any).grecaptcha) delete (window as any).grecaptcha;
      } catch (err) {
        // ignore cleanup errors
      }
    };
  }, []);

  return null;
}
