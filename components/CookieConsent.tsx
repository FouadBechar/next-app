"use client";
import React, { useEffect, useRef, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const acceptRef = useRef<HTMLButtonElement | null>(null);
  const declineRef = useRef<HTMLButtonElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  function readCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    const raw = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
    try {
      return raw ? decodeURIComponent(raw) : undefined;
    } catch (e) {
      return raw;
    }
  }

  function setCookie(name: string, value: string, days: number) {
    if (typeof document === "undefined") return;
    const maxAge = days * 24 * 60 * 60;
    const isSecure =
      typeof window !== "undefined" && window.location.protocol === "https:";
    const secureAttr = isSecure ? "; Secure" : "";
    document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax${secureAttr}`;
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = readCookie("consent");
    if (!existing) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    setTimeout(() => {
      try {
        acceptRef.current?.focus();
      } catch (err) { console.debug('CookieConsent focus error', err); }
    }, 50);

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setIsHiding(true);
        hideTimerRef.current = window.setTimeout(() => setVisible(false), 600);
      }
      if (e.key === "Tab") {
        if (document.activeElement === acceptRef.current && e.shiftKey) {
          e.preventDefault();
          declineRef.current?.focus();
        } else if (document.activeElement === declineRef.current && !e.shiftKey) {
          e.preventDefault();
          acceptRef.current?.focus();
        }
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [visible]);

    function accept() {
      setCookie("consent", "accepted", 30);
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      setIsHiding(true);
      hideTimerRef.current = window.setTimeout(() => setVisible(false), 600);
    }

  function decline() {
    setCookie("consent", "declined", 30);
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    setIsHiding(true);
    hideTimerRef.current = window.setTimeout(() => setVisible(false), 600);
  }

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="cookie-consent"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-dialog-title"
      aria-describedby="cookie-message"
      className={`cookie-consent ${isHiding ? "hide" : "show2"}`}
    >
      <h2 id="cookie-dialog-title" className="visually-hidden2">
        Cookie Consent
      </h2>
      <p id="cookie-message">This site uses cookies to enhance your experience.</p>
      <div className="cc-actions">
        <button
          type="button"
          id="accept"
          ref={acceptRef}
          title="accept"
          aria-label="Accept cookies"
          onClick={accept}
        >
          Accept
        </button>
        <button
          type="button"
          id="decline"
          ref={declineRef}
          title="decline"
          aria-label="Decline cookies"
          onClick={decline}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
