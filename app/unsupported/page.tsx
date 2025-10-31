export const metadata = {
  title: 'Unsupported browser',
  description:
    'Your browser appears to be out of date. Update for best performance and security.',
}

const GUIDE = 'https://www.whatismybrowser.com/guides/how-to-update-your-browser/'
const STORAGE_KEY = 'rb:oldBrowserDismissed'
const DISMISS_DAYS = 30

function ServerOverlay() {
  // Server-rendered HTML/CSS so very old browsers (without modern JS) still see the message.
  const inlineScript = ` (function(){try{var STORAGE_KEY=${JSON.stringify(STORAGE_KEY)},DISMISS_DAYS=${DISMISS_DAYS};function readDismissed(){try{var s=localStorage.getItem(STORAGE_KEY);if(!s)return false;var obj=JSON.parse(s);if(!obj||!obj.t)return false;var then=obj.t;var ms=(DISMISS_DAYS||30)*24*60*60*1000;return Date.now()-then<ms}catch(e){return false}}function writeDismissed(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({t:Date.now()}))}catch(e){} }var overlay=document.querySelector('.rb-old-overlay');if(!overlay)return; if(readDismissed()){try{overlay.parentNode&&overlay.parentNode.removeChild(overlay)}catch(e){}return;}var card=overlay.querySelector('.rb-old-card');var btn=document.getElementById('rb-old-dismiss');function onClose(){try{writeDismissed()}catch(e){}try{overlay.parentNode&&overlay.parentNode.removeChild(overlay)}catch(e){}document.removeEventListener('keydown',onKey,false)}function onKey(e){var k=e.key||e.keyIdentifier||e.which; if(k==='Escape' || k==='Esc' || k===27) onClose()}try{if(btn&&btn.addEventListener)btn.addEventListener('click',onClose,false);else if(btn&&btn.attachEvent)btn.attachEvent('onclick',onClose)}catch(e){}setTimeout(function(){try{if(card&&card.focus)card.focus()}catch(e){}},50);document.addEventListener('keydown',onKey,false);}catch(e){}})();`;

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: `
        .rb-old-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);z-index:9999999;padding:24px}
        .rb-old-card{max-width:760px;background:#111;color:#fff;padding:20px;border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,0.6)}
        .rb-old-actions{margin-top:12px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
        .rb-old-btn{background:#3a86ff;color:#fff;padding:8px 12px;border-radius:8px;text-decoration:none}
        .rb-old-close{background:transparent;color:#ddd;border:1px solid rgba(255,255,255,0.08);padding:8px 12px;border-radius:8px}
        .rb-old-h2{margin:0 0 8px}
        .rb-old-p{margin:0 0 8px}
        @media (prefers-reduced-motion: reduce){.rb-old-overlay,.rb-old-card{transition:none}}
      `}} />

      <div className="rb-old-overlay" role="dialog" aria-modal="true">
        <div className="rb-old-card" tabIndex={-1}>
          <h2 className="rb-old-h2">Important notice</h2>
          <p className="rb-old-p">
            Your browser or device appears to be out of date and some features on this site may not
            work correctly. For best performance and security, please update your browser.
          </p>

          <div className="rb-old-actions">
            <a className="rb-old-btn" href={GUIDE} target="_blank" rel="noopener noreferrer">
              How to update your browser
            </a>
            <button type="button" className="rb-old-close" id="rb-old-dismiss">
              Dismiss
            </button>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
    </main>
  )
}

export default function UnsupportedPage() {
  return <ServerOverlay />
}