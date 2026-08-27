'use client';

import type { CSSProperties } from 'react';

type TickerStripProps = {
  /** Text to scroll. Pass t.subtitle so it follows the EN/FR/ES switcher. */
  text: string;
  /** Typography classes for the text itself - each page keeps its own look. */
  className?: string;
  /** Inline styles for the text (gradient fills, text shadows). */
  style?: CSSProperties;
  /** Seconds for one full loop. Lower is faster. */
  speed?: number;
};

/**
 * Full-width scrolling subheading, travelling left to right.
 *
 * The track holds two identical halves and animates translateX(-50% -> 0), so
 * the wrap point lands on identical content and is invisible. Spacing lives in
 * each item's padding rather than a flex gap: a gap would put 2N-1 gaps in the
 * track, so 50% would no longer be exactly one half and the loop would drift.
 *
 * Only transform is animated, so it stays on the compositor and holds up on
 * mobile. Under prefers-reduced-motion the whole thing collapses to a single
 * static centred line.
 *
 * To reverse direction (right to left), add `animation-direction: reverse` to
 * .ticker-track - that one line is the whole change.
 */
export default function TickerStrip({ text, className = '', style, speed = 25 }: TickerStripProps) {
  const COPIES_PER_HALF = 4; // enough to overflow the widest viewport
  const items = Array.from({ length: COPIES_PER_HALF * 2 });

  return (
    // The label carries the text once for screen readers; the visual copies are
    // hidden so assistive tech does not read the phrase eight times.
    <div className="ticker" role="marquee" aria-label={text}>
      <div className="ticker-track" style={{ animationDuration: `${speed}s` }} aria-hidden="true">
        {items.map((_, i) => (
          <span key={i} className={`ticker-item ${className}`} style={style}>
            {text}
          </span>
        ))}
      </div>

      <style jsx>{`
        .ticker {
          width: 100%;
          overflow: hidden;
        }
        .ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
          animation-name: ticker-ltr;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .ticker-item {
          white-space: nowrap;
          padding-right: 3rem;
        }
        @keyframes ticker-ltr {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
            transform: none;
            width: 100%;
            justify-content: center;
          }
          .ticker-item {
            padding-right: 0;
            white-space: normal;
            text-align: center;
          }
          /* one static, readable copy */
          .ticker-item:not(:first-child) {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
