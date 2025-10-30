"use client"

import React from 'react'

export default function UnsupportedContinue() {
  function writeDismiss() {
    try {
      var keys = ['rb:oldBrowserDismissed', 'unsupported_browser_dismissed_v1']
      for (var i = 0; i < keys.length; i++) {
        try { localStorage.setItem(keys[i], JSON.stringify({ t: Date.now() })) } catch (e) {}
      }
    } catch (e) {}
  }

  function onContinue() {
    writeDismiss()
    try {
      if (document.referrer) window.location.replace(document.referrer)
      else window.location.replace('/')
    } catch (e) {
      window.location.href = '/'
    }
  }

  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      <button
        type="button"
        onClick={onContinue}
        className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
      >
        Continuer malgré tout
      </button>
      <a href="/" className="inline-flex items-center px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium">Retour à l'accueil</a>
    </div>
  )
}
