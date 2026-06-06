'use client';

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** 0, 1, 2 or 3 — staggered delay steps */
  delay?: 0 | 1 | 2 | 3;
  as?: ElementType;
}

/**
 * Subtle fade/slide-in on scroll, as a progressive enhancement.
 * Fail-safe: content is always revealed within 1.4s even if IntersectionObserver
 * misbehaves, and is forced visible under prefers-reduced-motion (and no-JS via CSS).
 */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisible(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setVisible(true);
      }
    };

    // If already within (or near) the viewport on mount, reveal next frames.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.95) {
      requestAnimationFrame(() => requestAnimationFrame(reveal));
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            obs.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -5% 0px' },
    );
    obs.observe(el);

    // Safety net: never leave content hidden.
    const t = window.setTimeout(reveal, 1400);

    return () => {
      obs.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  const delayClass =
    delay === 1 ? 'reveal-delay-1' : delay === 2 ? 'reveal-delay-2' : delay === 3 ? 'reveal-delay-3' : '';

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${visible ? 'is-visible' : ''} ${delayClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
