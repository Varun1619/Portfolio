import { useEffect, useRef, useState } from 'react';

// Reveal once when the element first scrolls into view.
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export const revealClass = (visible) =>
  `transition-all duration-[900ms] ease-[cubic-bezier(0.28,0.11,0.32,1)] ${
    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  }`;
