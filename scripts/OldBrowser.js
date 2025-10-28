(function () {
  // OldBrowser detection (feature-detection-first, accessible, dismissable)
  var GUIDE = 'https://www.whatismybrowser.com/guides/how-to-update-your-browser/';
  var STORAGE_KEY = 'rb:oldBrowserDismissed';
  var DISMISS_DAYS = 30;

  function supportsModern() {
    try {
      return (
        typeof Promise !== 'undefined' &&
        typeof fetch === 'function' &&
        typeof Symbol !== 'undefined' &&
        typeof String.prototype.includes === 'function' &&
        typeof Object.assign === 'function' &&
        typeof window.requestAnimationFrame === 'function' &&
        typeof window.matchMedia === 'function' &&
        (typeof CSS === 'undefined' || typeof CSS.supports === 'function')
      );
    } catch (e) {
      return false;
    }
  }

  function clientHintsOld() {
    try {
      if (navigator.userAgentData && navigator.userAgentData.brands) {
        var brands = navigator.userAgentData.brands || [];
        for (var i = 0; i < brands.length; i++) {
          var b = brands[i];
          var v = parseInt(b.version, 10);
          if (b.brand && /chromium|chrome/i.test(b.brand) && !isNaN(v) && v < 80) return true;
          if (b.brand && /firefox/i.test(b.brand) && !isNaN(v) && v < 70) return true;
        }
      } else if (typeof navigator.userAgent === 'string') {
        var ua = navigator.userAgent;
        if (/Trident\/|MSIE /.test(ua)) return true;
        if (/Opera Mini|Opera Mobi/i.test(ua)) return true;
      }
    } catch (e) {
      // ignore
    }
    return false;
  }

  function isBot() {
    var ua = (navigator.userAgent || '').toLowerCase();
    return /bot|crawl|spider|crawler|preview|headless/i.test(ua) || !!navigator.webdriver;
  }

  function readDismissed() {
    try {
      var s = localStorage.getItem(STORAGE_KEY);
      if (!s) return false;
      var obj = JSON.parse(s);
      if (!obj || !obj.t) return false;
      var then = obj.t;
      var ms = (DISMISS_DAYS || 30) * 24 * 60 * 60 * 1000;
      return Date.now() - then < ms;
    } catch (e) {
      return false;
    }
  }

  function writeDismissed() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ t: Date.now() }));
    } catch (e) {
      // ignore if storage not available
    }
  }

  if (isBot()) return;
  if (readDismissed()) return;
  if (supportsModern() && !clientHintsOld()) return;

  function buildOverlay() {
    var css = '' +
      '.rb-old-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);z-index:9999999;padding:24px}' +
      '.rb-old-card{max-width:760px;background:#111;color:#fff;padding:20px;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.6)}' +
      '.rb-old-actions{margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center}' +
      '.rb-old-btn{background:#3a86ff;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none}' +
      '.rb-old-close{background:transparent;color:#ddd;border:1px solid rgba(255,255,255,0.08);padding:8px 12px;border-radius:8px}' +
      '@media (prefers-reduced-motion: reduce){.rb-old-overlay,.rb-old-card{transition:none}}';

    var style = document.createElement('style');
    style.type = 'text/css';
    try { style.appendChild(document.createTextNode(css)); } catch (e) { style.styleSheet && (style.styleSheet.cssText = css); }
    (document.head || document.documentElement).appendChild(style);

    var overlay = document.createElement('div');
    overlay.className = 'rb-old-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    var card = document.createElement('div');
    card.className = 'rb-old-card';
    card.setAttribute('tabindex', '-1');

    var h = document.createElement('h2');
    h.style.margin = '0 0 8px';
    h.textContent = 'Important notice';

    var p = document.createElement('p');
    p.style.margin = '0 0 8px';
    p.textContent = 'Your browser or device appears to be out of date and some features on this site may not work correctly. For best performance and security, please update your browser.';

    var actions = document.createElement('div');
    actions.className = 'rb-old-actions';

    var a = document.createElement('a');
    a.className = 'rb-old-btn';
    a.href = GUIDE;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = 'How to update your browser';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'rb-old-close';
    btn.textContent = 'Dismiss';

    actions.appendChild(a);
    actions.appendChild(btn);
    card.appendChild(h);
    card.appendChild(p);
    card.appendChild(actions);
    overlay.appendChild(card);

    return { overlay: overlay, card: card, closeBtn: btn };
  }

  function show() {
    var nodes = buildOverlay();
    var overlay = nodes.overlay;
    var card = nodes.card;
    var closeBtn = nodes.closeBtn;

    function onClose() {
      try { writeDismissed(); } catch (e) {}
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.removeEventListener('keydown', onKey, false);
    }

    function onKey(e) { if (e.key === 'Escape' || e.key === 'Esc') onClose(); }

    try { closeBtn.addEventListener('click', onClose, false); } catch (e) {}
    setTimeout(function () { try { card.focus(); } catch (e) {} }, 50);
    document.addEventListener('keydown', onKey, false);

    (document.body || document.documentElement).appendChild(overlay);
  }

  if (document.readyState === 'loading') {
    if (document.addEventListener) document.addEventListener('DOMContentLoaded', show, false);
    else setTimeout(show, 50);
  } else {
    show();
  }
})();
