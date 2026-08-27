'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

type BannerProduct = {
  id?: string | number;
  name?: string;
  image?: string;
  price?: number;
  category?: string;
  availability?: string;
};

export type BannerSlide = {
  /** Group name, shown large. */
  headline: string;
  /** category values on the products array that make up this group. */
  categories: string[];
  /** Hero image path. Falls back to the dearest in-stock item if it sells out. */
  hero: string;
};

type CategoryBannerProps = {
  products: BannerProduct[];
  categoryName: string;
  /** Without slides the banner renders nothing - it never guesses groups. */
  slides?: BannerSlide[];
  /**
   * Called with the filter value for the clicked slide. The page owns the
   * filtering; this only reports which group was chosen.
   */
  onSelect?: (filterValue: string) => void;
};

const ROTATE_MS = 5000;
const BAR = '9, 6, 20'; // header bar colour (black/50 over the page gradient)
const IMG_SIZES = '(max-width: 767px) 100vw, 1200px';
const inStock = (p: BannerProduct) => p.availability !== 'Back Soon';

/**
 * Full-width hero banner for the category header bar.
 *
 * Each slide is the hero image at object-cover filling the whole banner, with a
 * gradient scrim on the left so the headline stays legible over it and a softer
 * fade on the right so the image does not butt against the EN pill.
 *
 * Every "From $X" is derived at runtime from the cheapest in-stock item in the
 * slide's group, so the figures cannot drift from the catalog.
 */
export default function CategoryBanner({ products, categoryName, slides, onSelect }: CategoryBannerProps) {
  const built = useMemo(() => {
    if (!slides?.length) return [];
    return slides
      .map((s) => {
        const group = (products || []).filter((p) => p.category && s.categories.includes(p.category));
        const live = group.filter(inStock).filter((p) => typeof p.price === 'number');
        if (!live.length) return null; // nothing in stock - slide is skipped

        const from = Math.min(...live.map((p) => p.price as number));

        // multi-category slides filter to whichever value has the most in stock
        const counts = s.categories.map((c) => ({
          c,
          n: live.filter((p) => p.category === c).length,
        }));
        const filterValue = counts.sort((a, b) => b.n - a.n)[0].c;

        // if the named hero is out of stock, fall back to the dearest in-stock item
        const heroProduct = (products || []).find((p) => p.image === s.hero);
        let image = s.hero;
        if (heroProduct && !inStock(heroProduct)) {
          const dearest = [...live].sort((a, b) => (b.price as number) - (a.price as number))[0];
          if (dearest?.image) image = dearest.image;
        }
        return { headline: s.headline, from, image, filterValue };
      })
      .filter(Boolean) as { headline: string; from: number; image: string; filterValue: string }[];
  }, [products, slides]);

  const isStatic = built.length < 2;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduced.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => { reduced.current = e.matches; };
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (isStatic || paused || reduced.current) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % built.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [isStatic, paused, built.length]);

  const go = useCallback(
    (d: number) => setIndex((i) => (i + d + built.length) % built.length),
    [built.length]
  );

  if (!built.length) return null; // never an empty banner

  const money = (n: number) => `$${n.toFixed(2).replace(/\.00$/, '')}`;

  return (
    <div
      className="hero"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${categoryName} highlights`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {built.map((s, i) => (
        <div key={s.headline} className={`hero-slide ${i === index ? 'is-active' : ''}`} aria-hidden={i === index ? undefined : true}>
          <button
            type="button"
            className="hero-click"
            tabIndex={i === index ? 0 : -1}
            onClick={() => onSelect?.(s.filterValue)}
            aria-label={`View ${s.headline.toLowerCase()}, from ${money(s.from)}`}
          >
            {/* masked so the imagery dissolves into the page; the text below is
                deliberately outside this wrapper so it stays fully crisp */}
            <span className="hero-visual" aria-hidden="true">
              <Image
                src={s.image}
                alt=""
                fill
                className="hero-img"
                sizes={IMG_SIZES}
                priority={i === 0}
              />
              <span className="hero-scrim" />
              <span className="hero-fade" />
            </span>
            <span className="hero-text">
              <span className="hero-head">{s.headline}</span>
              <span className="hero-sub">From {money(s.from)}</span>
            </span>
          </button>
        </div>
      ))}

      {!isStatic && (
        <>
          <button type="button" className="hero-nav hero-prev" onClick={() => go(-1)} aria-label={`Previous ${categoryName} highlight`}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="hero-nav hero-next" onClick={() => go(1)} aria-label={`Next ${categoryName} highlight`}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="hero-dots">
            {built.map((s, i) => (
              <button
                key={s.headline}
                type="button"
                className={`hero-dot ${i === index ? 'is-active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Show ${s.headline}`}
                aria-current={i === index ? 'true' : undefined}
              />
            ))}
          </div>
        </>
      )}

      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          height: 180px; /* reserved, so nothing shifts as images load */
          overflow: hidden;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 600ms ease;
        }
        /* The imagery dissolves to nothing over the bottom ~55% of the banner,
           letting the page's own background show through instead of trying to
           repaint it. The pages use corner gradients, so the true colour at this
           edge varies across the width (by up to 30 rgb steps on phones) and
           with page height - no single flat value can match it. Revealing is
           exact on every page, with no colour to configure.
           Scoped to the visual layers: the text, chevrons and dots stay crisp. */
        .hero-visual {
          position: absolute;
          inset: 0;
          -webkit-mask-image: linear-gradient(
            to bottom,
            #000 0%,
            #000 45%,
            rgba(0, 0, 0, 0.86) 60%,
            rgba(0, 0, 0, 0.58) 73%,
            rgba(0, 0, 0, 0.28) 86%,
            rgba(0, 0, 0, 0.08) 95%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            #000 0%,
            #000 45%,
            rgba(0, 0, 0, 0.86) 60%,
            rgba(0, 0, 0, 0.58) 73%,
            rgba(0, 0, 0, 0.28) 86%,
            rgba(0, 0, 0, 0.08) 95%,
            transparent 100%
          );
        }
        .hero-slide.is-active {
          opacity: 1;
          visibility: visible;
        }
        /* the whole slide is the click target; chevrons and dots sit above it */
        .hero-click {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          padding: 0;
          border: 0;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }
        .hero-click:focus-visible {
          outline: 3px solid #ffd700;
          outline-offset: -3px;
        }
        .hero-click :global(.hero-img) {
          object-fit: cover;
          object-position: center;
        }
        /* keeps the headline legible over whatever the image is doing */
        .hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(${BAR}, 0.92) 0%,
            rgba(${BAR}, 0.78) 30%,
            rgba(${BAR}, 0.35) 50%,
            rgba(${BAR}, 0) 66%
          );
        }
        /* right edge softens into the bar so it does not butt against the EN pill */
        .hero-fade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to left, rgba(${BAR}, 0.85) 0%, rgba(${BAR}, 0) 18%);
        }
        .hero-text {
          position: absolute;
          left: 62px;
          top: 50%;
          transform: translate3d(0, -50%, 0);
          max-width: 52%;
          display: block;
          z-index: 2;
        }
        /* text arrives from the left with a little overshoot, settling at 480ms */
        .hero-slide.is-active .hero-text {
          animation: hero-text-in 480ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes hero-text-in {
          from { opacity: 0; transform: translate3d(-42px, -50%, 0); }
          to   { opacity: 1; transform: translate3d(0, -50%, 0); }
        }
        .hero-head {
          display: block;
          color: #fff;
          /* fluid: 1.35rem at 375px up to 2.2rem on desktop */
          font-size: clamp(1.35rem, 3.5vw, 2.2rem);
          font-weight: 800;
          line-height: 1.12;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.9);
        }
        .hero-sub {
          display: block;
          margin-top: 7px;
          color: #ffd700;
          /* tracks the headline at roughly 0.6x */
          font-size: clamp(0.95rem, 2.1vw, 1.35rem);
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9);
        }
        .hero-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(0, 0, 0, 0.5);
          color: #fff;
          cursor: pointer;
          z-index: 4;
        }
        .hero-nav:hover {
          background: rgba(0, 0, 0, 0.75);
          border-color: #ffd700;
          color: #ffd700;
        }
        .hero-nav:focus-visible {
          outline: 2px solid #ffd700;
          outline-offset: 2px;
        }
        .hero-prev { left: 10px; }
        .hero-next { right: 10px; }
        .hero-dots {
          position: absolute;
          bottom: 12px;
          left: 62px;
          display: flex;
          gap: 6px;
          z-index: 4;
        }
        .hero-dot {
          width: 8px;
          height: 8px;
          padding: 0;
          border: none;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
        }
        .hero-dot.is-active { background: #ffd700; }
        .hero-dot:focus-visible {
          outline: 2px solid #ffd700;
          outline-offset: 2px;
        }
        @media (max-width: 767px) {
          .hero { height: 132px; }
          /* wider text column on small screens so a long headline like
             "Earbuds & headphones" wraps to two clean lines, never mid-word */
          .hero-text { left: 50px; max-width: 64%; }
          .hero-dots { left: 50px; bottom: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-slide { transition: none; }
          .hero-slide.is-active .hero-text {
            animation: none;
            opacity: 1;
            transform: translate3d(0, -50%, 0);
          }
        }
      `}</style>
    </div>
  );
}
