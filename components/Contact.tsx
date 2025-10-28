"use client";
import React, { useEffect } from 'react';

export default function Contact() {
  useEffect(() => {
    const formContainer = document.getElementById('form-container') as HTMLDivElement | null;
    const form = document.getElementById('my-form') as HTMLFormElement | null;
    const closeBtn2 = document.getElementById('close-btn2') as HTMLButtonElement | null;
    const openBtn = document.getElementById('open-btn') as HTMLElement | null;
    const fileInput = document.getElementById('file-input') as HTMLInputElement | null;
    const filePreview = document.getElementById('file-preview') as HTMLDivElement | null;
    const responseMsg = document.getElementById('responseMessage') as HTMLParagraphElement | null;
    const loadingOverlay = document.getElementById('loading-overlay') as HTMLDivElement | null;

    let isClosing = false;

    if (
      !formContainer ||
      !form ||
      !closeBtn2 ||
      !openBtn ||
      !fileInput ||
      !filePreview ||
      !responseMsg
    ) {
      console.warn('Contact form: some DOM elements are missing; skipping initialization.');
      return;
    }

    // narrow types for use in handlers
    const fc = formContainer as HTMLDivElement;
    const f = form as HTMLFormElement;
    const cb2 = closeBtn2 as HTMLButtonElement;
    const ob = openBtn as HTMLElement;
    const fi = fileInput as HTMLInputElement;
    const fp = filePreview as HTMLDivElement;
    const rm = responseMsg as HTMLParagraphElement;
    const lo = loadingOverlay as HTMLDivElement | null;

    function handleOpen() {
      f.classList.remove('fade-out');
      void (f.offsetWidth);
      f.classList.add('bounce-in');
      fc.style.display = 'flex';
      ob.style.display = 'none';
    }

    function handleClose() {
      if (isClosing) return;
      isClosing = true;
      f.classList.remove('bounce-in');
      f.classList.add('fade-out');
      setTimeout(() => {
        fc.style.display = 'none';
        rm.textContent = '';
        rm.style.padding = '0px';
        ob.style.display = 'inline-block';
        isClosing = false;
      }, 600);
    }

    async function handleSubmit(e: Event) {
      e.preventDefault();
      try {
        if (lo) {
          lo.style.display = 'flex';
          lo.setAttribute('aria-hidden', 'false');
        }
      } catch (err) {
        console.debug('Contact show loading overlay error', err);
      }
      const formData = new FormData(f);
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json().catch(() => ({} as any));
        const message = data && data.message ? data.message : 'Submission complete';
        const status = data && data.status ? data.status : res.ok ? 'success' : 'error';
        rm.textContent = message;
        rm.style.color = status === 'success' ? 'green' : 'red';
        rm.style.padding = '4px';

        if (status === 'success') {
          try { f.reset(); } catch (err) { console.debug('form.reset error', err); }
          fp.textContent = '';
        }
      } catch (err) {
        const msg = (err && (err as any).message) ? (err as any).message : String(err);
        rm.textContent = 'Error: ' + msg;
        rm.style.color = 'red';
      } finally {
        try {
          if (lo) {
            lo.style.display = 'none';
            lo.setAttribute('aria-hidden', 'true');
          }
        } catch (err) {
          console.debug('Contact hide loading overlay error', err);
        }
      }
    }

    function handleFileChange() {
      const files = fi.files;
      if (files && files[0] && files[0].size > 5 * 1024 * 1024) {
        rm.textContent = 'File too large (max 5MB)';
        rm.style.color = 'red';
        fi.value = '';
        fp.textContent = '';
      } else {
        fp.textContent = files && files.length > 0 ? 'Selected: ' + files[0].name : '';
        if (rm.textContent && rm.style.color === 'red') {
          rm.textContent = '';
          rm.style.padding = '0px';
        }
      }
    }

    ob.addEventListener('click', handleOpen);
    cb2.addEventListener('click', handleClose);
    f.addEventListener('submit', handleSubmit);
    fi.addEventListener('change', handleFileChange);

    return () => {
      try {
        ob.removeEventListener('click', handleOpen);
      } catch (err) {
        console.debug('Contact cleanup openBtn', err);
      }
      try {
        cb2.removeEventListener('click', handleClose);
      } catch (err) {
        console.debug('Contact cleanup closeBtn2', err);
      }
      try {
        f.removeEventListener('submit', handleSubmit);
      } catch (err) {
        console.debug('Contact cleanup form', err);
      }
      try {
        fi.removeEventListener('change', handleFileChange);
      } catch (err) {
        console.debug('Contact cleanup fileInput', err);
      }
    };
  }, []);

  return (
    <>
      <div id="form-container">
        <div id="loading-overlay" role="status" aria-hidden="true" className="loading-overlay">
          <div>
            <div className="spinner02" aria-hidden="true" />
            Sending...
          </div>
        </div>
        <form id="my-form" className="animated" encType="multipart/form-data" method="POST">
          <button type="button" id="close-btn2" title="close-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              width="22px"
              height="22px"
              fillRule="nonzero"
            >
              <g
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="inherit"
                /* intentionally default blending */
              >
                <g transform="scale(3.55556,3.55556)">
                  <path d="M19,15c-1.023,0 -2.04812,0.39087 -2.82812,1.17188c-1.562,1.562 -1.562,4.09425 0,5.65625l14.17188,14.17188l-14.17187,14.17188c-1.562,1.562 -1.562,4.09425 0,5.65625c0.78,0.78 1.80513,1.17188 2.82813,1.17188c1.023,0 2.04812,-0.39088 2.82813,-1.17187l14.17188,-14.17187l14.17188,14.17188c1.56,1.562 4.09525,1.562 5.65625,0c1.563,-1.563 1.563,-4.09325 0,-5.65625l-14.17187,-14.17187l14.17188,-14.17187c1.562,-1.562 1.562,-4.09425 0,-5.65625c-1.56,-1.561 -4.09625,-1.562 -5.65625,0l-14.17187,14.17188l-14.17187,-14.17187c-0.78,-0.78 -1.80513,-1.17187 -2.82812,-1.17187z" />
                </g>
              </g>
            </svg>
          </button>
          <h2>Contact Form</h2>
          <p id="responseMessage" className="pp00"></p>
          <input className="input02" type="text" name="prenom" placeholder="First Name" required />
          <input className="input02" type="text" name="nom" placeholder="Last Name" required />
          <input
            className="input02"
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <textarea className="textarea02" name="textarea" placeholder="Your message"></textarea>
          <input
            className="input002"
            type="file"
            name="file"
            id="file-input"
            placeholder="selet file"
          />
          <div id="file-preview" className="preview"></div>
          <button className="button2" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
