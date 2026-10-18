import { useEffect, useLayoutEffect, useRef } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Calls onProgress(p) as the element scrolls through the viewport, where p runs
 * from 0 (element top at `start` × viewport height) to 1 (element top at `end` ×
 * viewport height). Updates are written in onProgress directly (no React state),
 * once per animation frame. With reduced motion, onProgress(1) is called once.
 */
export function useScrollScrub(ref, onProgress, { start = 1, end = 0.5 } = {}) {
  const callback = useRef(onProgress);
  useLayoutEffect(() => {
    callback.current = onProgress;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      callback.current(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const top = el.getBoundingClientRect().top;
      const p = (vh * start - top) / (vh * (start - end));
      callback.current(Math.min(Math.max(p, 0), 1));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, start, end]);
}

// Ease-out curve so movement settles gently as it reaches its end state.
export const easeOut = (t) => 1 - Math.pow(1 - t, 3);
