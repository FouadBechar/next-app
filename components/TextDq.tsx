"use client";
import React, { useEffect, useRef } from 'react';
import TypeIt from 'typeit';

// Minimal surface type for the TypeIt instance used here
interface TypeItInstance {
  freeze?: () => void;
  unfreeze?: () => void;
  go?: () => void;
  destroy?: () => void;
  [key: string]: any;
}

export default function TextDq() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const typeitInstance = useRef<TypeItInstance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
  const container = containerRef.current;

  const instance = new (TypeIt as any)(textRef.current as any, {
      speed: 100,
      loop: true,
      waitUntilVisible: true,
      cursor: true,
      cursorChar: '|',
      afterStep: () => {
        if (container && container.scrollHeight > container.clientHeight) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'auto',
          });
        }
      },
      afterDelete: () => {
        if (container) {
          container.scrollTo({ top: 0, behavior: 'smooth' });
        }
      },
    })
      .type('\ud83c\udf0d The World Wide Fund for Nature (WWF) was founded in 1961.')
      .pause(1500)
      .delete(null, { instant: true })
      .type('\ud83c\udf31 It works in wilderness preservation and reducing human impact.')
      .pause(1500)
      .delete(null, { instant: true })
      .type('\ud83d\udc3c It was formerly named the World Wildlife Fund.')
      .pause(1500)
      .delete(null, { instant: true })
      .type("\ud83d\udc9a WWF is the world's largest conservation organization.")
      .pause(1500)
      .delete(null, { instant: true })
      .go();

  typeitInstance.current = instance as TypeItInstance;

    return () => {
      try {
  if (instance && typeof (instance as any).destroy === 'function') (instance as any).destroy();
      } catch (err) { console.debug('TextDq instance destroy error', err); }
      try {
        typeitInstance.current = null;
      } catch (err) { console.debug('TextDq clear instance error', err); }
    };
  }, []);

  let lastPause = 0;
  let lastResume = 0;
  const DEBOUNCE_MS = 200;

  const pauseTypeIt = () => {
    try {
      const inst = typeitInstance.current;
      if (!inst) return;
      if (typeof inst.freeze === 'function') {
        try {
          const now = Date.now();
          if (now - lastPause < DEBOUNCE_MS) return;
          lastPause = now;
          inst.freeze();
          return;
        } catch (err) { console.debug('TextDq freeze error', err); }
      }
      const fallbackCandidates = ['pause', 'stop', 'pauseTyping', 'halt'];
      for (const fn of fallbackCandidates) {
        if (typeof inst[fn] === 'function') {
            try {
              const now = Date.now();
              if (now - lastPause < DEBOUNCE_MS) return;
              lastPause = now;
              inst[fn]();
              return;
            } catch (err) { console.debug('TextDq fallback pause candidate error', err); }
        }
      }
    } catch (err) { console.error('TextDq.pauseTypeIt error', err); }
  };

  const resumeTypeIt = () => {
    try {
      const inst = typeitInstance.current;
      if (!inst) return;
      if (typeof inst.unfreeze === 'function') {
          try {
            const now = Date.now();
            if (now - lastResume < DEBOUNCE_MS) return;
            lastResume = now;
            inst.unfreeze();
            return;
          } catch (err) { console.debug('TextDq unfreeze error', err); }
      }
      if (typeof inst.go === 'function') {
          try {
            const now = Date.now();
            if (now - lastResume < DEBOUNCE_MS) return;
            lastResume = now;
            inst.go();
            return;
          } catch (err) { console.debug('TextDq go() error', err); }
      }
      const fallbackCandidates = ['resume', 'start', 'play', 'continue', 'toggle', 'unpause'];
      for (const fn of fallbackCandidates) {
        if (typeof inst[fn] === 'function') {
            try {
              const now = Date.now();
              if (now - lastResume < DEBOUNCE_MS) return;
              lastResume = now;
              inst[fn]();
              return;
            } catch (err) { console.debug('TextDq fallback resume candidate error', err); }
        }
      }
    } catch (err) { console.error('TextDq.resumeTypeIt error', err); }
  };

  return (
    <div
      className="container"
      ref={containerRef}
      onMouseEnter={pauseTypeIt}
      onMouseLeave={resumeTypeIt}
      onPointerEnter={pauseTypeIt}
      onPointerLeave={resumeTypeIt}
      onTouchStart={pauseTypeIt}
      onTouchEnd={resumeTypeIt}
    >
      <span className="text1" ref={textRef}></span>
    </div>
  );
}
