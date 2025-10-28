"use client";
import React, {useEffect} from "react";

const image1ss = '/assets/image1ss.webp';
const image2ss = '/assets/image2ss.webp';
const image3ss = '/assets/image3ss.webp';

export default function Slideshow() {

 const section8 = (
   <>
      <div className="mySlides fade">
        <div className="numbertext">1 / 3</div>
        <img className="imgslideshow" src={image1ss} alt="image002" />
        <div className="text">
          <p>
            <a
              className="i0i2 loadicon010101"
              href="https://breathingtravel.com/best-islands-to-visit-in-indonesia/"
              target="_parent"
              rel="noreferrer"
            >
              Bali Island
            </a>
            is one of the most beautiful tourist places in Indonesia, because of
            its rich natural beauty and ancient history and heritage that makes
            it one of the best cities in the world.
          </p>
        </div>
      </div>

      <div className="mySlides fade">
        <div className="numbertext">2 / 3</div>
        <img className="imgslideshow" src={image2ss} alt="image03" />
        <div className="text">
          <p>
            <a
              className="i0i2 loadicon010101"
              href="https://www.tripadvisor.fr/Tourism-g298566-Osaka_Osaka_Prefecture_Kinki-Vacations.html"
              target="_parent"
              rel="noreferrer"
            >
              Osaka
            </a>
            the second largest and richest city in Japan, and one of the most
            beautiful tourism cities in Japan and in the world as a whole, due
            to its long history that extends back to before the 16th century.
          </p>
        </div>
      </div>

      <div className="mySlides fade">
        <div className="numbertext">3 / 3</div>
        <img className="imgslideshow" src={image3ss} alt="image04" />
        <div className="text">
          <p>
            <a
              className="i0i2 loadicon010101"
              href="https://www.routard.com/guide/code_dest/new_york.htm"
              target="_parent"
              rel="noreferrer"
            >
              New York
            </a>
            is famous for its world-renowned shopping and fine restaurants
            around the most important tourist places such as the Statue of
            Liberty, its historical neighborhoods and museums.
          </p>
        </div>
      </div>

  <button type="button" className="prev" aria-label="Previous slide"> &lt; </button>
  <button type="button" className="next" aria-label="Next slide"> &gt; </button>
  </>
  );

  const section9 = (
  <>
      <button type="button" className="dot" onClick={() => window.currentSlide && window.currentSlide(1)} aria-label="Go to slide 1" />
      <button type="button" className="dot" onClick={() => window.currentSlide && window.currentSlide(2)} aria-label="Go to slide 2" />
      <button type="button" className="dot" onClick={() => window.currentSlide && window.currentSlide(3)} aria-label="Go to slide 3" />
  </>
  );

  useEffect(() => {

  let slideIndex = 1;
  let slideInterval: number | undefined;
  let isPaused = false;

    function showSlides(n: number) {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
      if (!slides || slides.length === 0) return;
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        const s = slides[i] as HTMLElement;
        s.style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        const d = dots[i] as HTMLElement;
        d.className = d.className.replace(" active", "");
      }
      const currentSlide = slides[slideIndex - 1] as HTMLElement;
      currentSlide.style.display = "block";
      if (dots && dots[slideIndex - 1]) (dots[slideIndex - 1] as HTMLElement).className += " active";
    }

    function plusSlides(n: number) {
      if (!isPaused) {
        if (slideInterval) clearInterval(slideInterval);
        showSlides((slideIndex += n));
        slideInterval = window.setInterval(() => showSlides((slideIndex += 1)), 10000);
      }
    }

    function currentSlide(n: number) {
      if (!isPaused) {
        if (slideInterval) clearInterval(slideInterval);
        showSlides((slideIndex = n));
        slideInterval = window.setInterval(() => showSlides((slideIndex += 1)), 10000);
      }
    }

    try {
      window.currentSlide = currentSlide;
    } catch (err) { console.debug('Slideshow expose currentSlide error', err); }

    showSlides(slideIndex);
  slideInterval = window.setInterval(() => showSlides((slideIndex += 1)), 10000);

  const prevButton = document.querySelector(".prev") as HTMLElement | null;
  const nextButton = document.querySelector(".next") as HTMLElement | null;
    const prevHandler = () => plusSlides(-1);
    const nextHandler = () => plusSlides(1);
    if (prevButton) prevButton.addEventListener("click", prevHandler);
    if (nextButton) nextButton.addEventListener("click", nextHandler);

    const slideEls = Array.from(document.querySelectorAll(".mySlides")) as HTMLElement[];
    const hoverHandlers: Array<{ el: HTMLElement; onMouseOver: () => void; onMouseOut: () => void }> = [];
    slideEls.forEach((el) => {
      const onMouseOver = () => {
        clearInterval(slideInterval);
        isPaused = true;
      };
      const onMouseOut = () => {
        isPaused = false;
        slideInterval = window.setInterval(() => showSlides((slideIndex += 1)), 10000);
      };
      el.addEventListener("mouseover", onMouseOver);
      el.addEventListener("mouseout", onMouseOut);
      hoverHandlers.push({ el, onMouseOver, onMouseOut });
    });

    return () => {
      try {
        clearInterval(slideInterval);
      } catch (err) { console.debug('Slideshow clearInterval error', err); }
      try {
        if (prevButton) prevButton.removeEventListener("click", prevHandler);
      } catch (err) { console.debug('Slideshow prevButton remove error', err); }
      try {
        if (nextButton) nextButton.removeEventListener("click", nextHandler);
      } catch (err) { console.debug('Slideshow nextButton remove error', err); }
      hoverHandlers.forEach(({ el, onMouseOver, onMouseOut }) => {
        try {
          el.removeEventListener("mouseover", onMouseOver);
          el.removeEventListener("mouseout", onMouseOut);
        } catch (err) { console.debug('Slideshow hoverHandlers remove error', err); }
      });
      try {
        if (window && window.currentSlide) delete window.currentSlide;
      } catch (err) { console.debug('Slideshow delete window.currentSlide error', err); }
    };

  }, []);
 
  return (
    <>
      <div id="text8" className="slideshow-container animate0110">
        {section8}
      </div>
      <div id="text9" className="animate0110 slideshow-dots">
        {section9}
      </div>
    </>
  );
}
