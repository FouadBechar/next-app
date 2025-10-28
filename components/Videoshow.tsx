"use client";
import React, { useEffect } from "react";

const d1 = '/assets/d1.webp';

export default function Videoshow() {

  useEffect(() => {
    const openPop11 = document.querySelector(".open01") as HTMLElement | null;
    const closeBtn = document.querySelector(".close") as HTMLElement | null;
    const wrapper = document.querySelector(".wrapper") as HTMLElement | null;
    const vividd1 = document.querySelector(".vividd") as HTMLVideoElement | null;

    if (!openPop11 || !closeBtn || !wrapper || !vividd1) {
      console.warn('Videoshow: required DOM elements missing, skipping initialization');
      return;
    }

    function handleOpen() {
      if (!wrapper || !vividd1) return;
      wrapper.classList.add("active");
      vividd1.src = "https://res.cloudinary.com/dgi9vyjff/video/upload/v1729979577/WWF.mp4";
      try {
        vividd1.muted = true;
        const p = vividd1.play();
        if (p && typeof p.catch === 'function') p.catch((err: unknown) => { console.debug('Videoshow play() promise rejected', err); });
      } catch (err) { console.debug('Videoshow play error', err); }
    }

    function handleClose() {
      if (!wrapper || !vividd1) return;
      wrapper.classList.remove("active");
      try {
        vividd1.pause();
        vividd1.currentTime = 0;
      } catch (err) { console.debug('Videoshow pause/reset error', err); }
      vividd1.src = "";
    }

    openPop11.addEventListener("click", handleOpen);
    closeBtn.addEventListener("click", handleClose);

    return () => {
      try {
        openPop11.removeEventListener("click", handleOpen);
      } catch (err) { console.debug('Videoshow remove openPop11 listener error', err); }
      try {
        closeBtn.removeEventListener("click", handleClose);
      } catch (err) { console.debug('Videoshow remove closeBtn listener error', err); }
    };
  }, []);
 
  return (
    <>
      <div className="wrapper010" />
      <div className="open01">
        <img
          className="grid1img"
          src={d1}
          width={200}
          height={133}
          alt="WWF preview"
        />
      </div>

      <div className="wrapper">
        <video className="vividd" src="" preload="auto" controls muted />
        <div className="close">
          <a href="https://www.worldwildlife.org/" target="_parent" rel="noreferrer">
            <button type="button" className="lien01">
              WWF
            </button>
          </a>
          <button type="button" className="close01">Close</button>
        </div>
      </div>
    </>
  );
}
