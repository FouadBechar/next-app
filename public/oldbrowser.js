(function () {
  function runCheck() {
    try {
      var key = 'unsupported_browser_dismissed_v1';
      try {
        if (localStorage && localStorage.getItem && localStorage.getItem(key) === '1') return;
      } catch (e) {}

      var ok = true;
      if (typeof window.Promise === 'undefined') ok = false;
      if (typeof window.fetch === 'undefined') ok = false;
      if (typeof window.Symbol === 'undefined') ok = false;
      if (typeof Object.assign !== 'function') ok = false;
      if (typeof Array.prototype.includes !== 'function') ok = false;
      if (typeof window.CSS !== 'undefined' && typeof window.CSS.supports === 'function') {
        try {
          if (!window.CSS.supports('( --x: 0 )')) ok = false;
        } catch (e) {}
      }

      if (ok) return;

      var root = document.createElement('div');
      root.setAttribute('role', 'alert');
      root.style.position = 'fixed';
      root.style.top = '0';
      root.style.left = '0';
      root.style.right = '0';
      root.style.zIndex = '99999';
      root.style.background = '#fffbeb';
      root.style.color = '#92400e';
      root.style.padding = '12px 16px';
      root.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      root.style.fontFamily = 'sans-serif';
      root.style.fontSize = '14px';

      var content = document.createElement('div');
      content.style.display = 'flex';
      content.style.alignItems = 'center';
      content.style.justifyContent = 'space-between';
      content.style.gap = '12px';

      var left = document.createElement('div');
      left.style.flex = '1';
      var title = document.createElement('strong');
      title.style.display = 'block';
      title.style.marginBottom = '4px';
      title.textContent = 'Your browser or operating system is out of date';
      var p = document.createElement('div');
      p.textContent = 'This site requires a modern browser. Please update your browser or operating system for security and best experience.';
      left.appendChild(title);
      left.appendChild(p);

      var links = document.createElement('div');
      links.style.marginTop = '6px';
      function makeLink(href, text) {
        var a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.marginRight = '8px';
        a.style.color = 'inherit';
        a.style.textDecoration = 'underline';
        a.textContent = text;
        return a;
      }
      links.appendChild(makeLink('https://www.google.com/chrome/', 'Chrome'));
      links.appendChild(makeLink('https://www.mozilla.org/firefox/new/', 'Firefox'));
      links.appendChild(makeLink('https://www.microsoft.com/edge', 'Edge'));
      links.appendChild(makeLink('https://support.apple.com/downloads/safari', 'Safari'));
      left.appendChild(links);

      var btnWrap = document.createElement('div');
      var btn = document.createElement('button');
      btn.textContent = 'Dismiss';
      btn.style.background = '#92400e';
      btn.style.color = '#fff';
      btn.style.border = 'none';
      btn.style.padding = '8px 12px';
      btn.style.borderRadius = '6px';
      btn.style.cursor = 'pointer';
      btn.onclick = function () {
        try {
          localStorage.setItem(key, '1');
        } catch (e) {}
        if (root.parentNode) root.parentNode.removeChild(root);
        if (spacer && spacer.parentNode) spacer.parentNode.removeChild(spacer);
      };
      btnWrap.appendChild(btn);

      content.appendChild(left);
      content.appendChild(btnWrap);
      root.appendChild(content);

      var spacer = document.createElement('div');
      spacer.style.height = '64px';

      var b = document.body || document.getElementsByTagName('body')[0];
      if (b) {
        b.insertBefore(root, b.firstChild);
        b.insertBefore(spacer, root.nextSibling);
      } else {
        document.documentElement.insertBefore(root, document.documentElement.firstChild);
      }
    } catch (e) {}
  }

  if (typeof requestIdleCallback === 'function') {
    try {
      requestIdleCallback(runCheck, { timeout: 2000 });
    } catch (e) {
      setTimeout(runCheck, 1500);
    }
  } else {
    setTimeout(runCheck, 1500);
  }
})();
// OldBrowser detection (feature-detection-first, accessible, dismissable)
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
    // Load the CSS file from /oldbrowser.css (avoids inline styles and allows stricter CSP)
    try {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/oldbrowser.css';
      (document.head || document.documentElement).appendChild(link);
    } catch (e) {
      // if link fails, fall back to nothing; overlay will still show with minimal styling
    }

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
    // remember previously-focused element so we can restore focus when overlay is dismissed
    var prevActive = document.activeElement;
    var nodes = buildOverlay();
    var overlay = nodes.overlay;
    var card = nodes.card;
    var closeBtn = nodes.closeBtn;

    function onClose() {
      try { writeDismissed(); } catch (e) {}
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.removeEventListener('keydown', onKey, false);
      // try restore focus to previously-focused element for accessibility
      try {
        if (prevActive && typeof prevActive.focus === 'function') {
          prevActive.focus();
        }
      } catch (e) {
        // ignore focus restoration errors
      }
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
