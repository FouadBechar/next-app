"use client";

import { useEffect, useState } from "react";
import "./unsupported-browser.css";

// Simple feature-detection based unsupported browser banner.
// It avoids userAgent sniffing and instead tests for modern APIs the app requires.

const STORAGE_KEY = "unsupported_browser_dismissed_v1";

function isBrowserSupported(): boolean {
  try {
    // Minimal modern JS & web APIs we expect
    if (typeof Promise === "undefined") return false;
    if (typeof fetch === "undefined") return false;
    if (typeof Symbol === "undefined") return false;
    if (typeof Array.prototype.includes !== "function") return false;
    if (typeof Object.assign !== "function") return false;
    if (typeof Map === "undefined") return false;
    // CSS custom properties support (not strictly required but useful)
    if (typeof window.CSS !== "undefined" && typeof window.CSS.supports === "function") {
      if (!window.CSS.supports("(--a: 0)")) return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export default function UnsupportedBrowser() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (dismissed === "1") return;
    } catch (e) {
      // localStorage may be unavailable, ignore
    }

    const ok = isBrowserSupported();
    if (!ok) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div className="ub-root">
      <div className="ub-bar">
        <div className="ub-content">
          <strong className="ub-title">Your browser or operating system is out of date</strong>
          <div className="ub-text">
            This site requires a modern browser. Please update your browser or operating system for security and best experience.
            <div className="ub-links" style={{ marginTop: 6 }}>
              <a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer">Download Chrome</a>
              <a href="https://www.mozilla.org/firefox/new/" target="_blank" rel="noopener noreferrer">Download Firefox</a>
              <a href="https://www.microsoft.com/edge" target="_blank" rel="noopener noreferrer">Download Edge</a>
              <a href="https://support.apple.com/downloads/safari" target="_blank" rel="noopener noreferrer">Safari updates</a>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              try {
                localStorage.setItem(STORAGE_KEY, "1");
              } catch (e) {}
              setShow(false);
            }}
            className="ub-button"
          >
            Dismiss
          </button>
        </div>
      </div>
      {/* add a spacer so page content isn't covered */}
      <div className="ub-spacer" aria-hidden />
    </div>
  );
}
