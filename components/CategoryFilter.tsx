'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

type CategoryFilterProps = {
  /** Filter keys in the order they should appear, e.g. ['all', 'speakers', ...]. */
  options: string[];
  /** Current filter. Controlled by the page, so a filter set elsewhere - the
   *  banner click-through, for instance - is reflected here too. */
  value: string;
  onChange: (next: string) => void;
  /** The page's translations object; labels are looked up by filter key. */
  labels: Record<string, unknown>;
  /** Translated "Filter by" label. */
  filterByLabel: string;
};

/**
 * Single Filters button + dropdown, replacing the wrapping row of pills.
 *
 * Controlled: `value` comes from the page's existing filterCategory state and
 * the filtering logic is untouched - this only changes how the control looks.
 */
export default function CategoryFilter({ options, value, onChange, labels, filterByLabel }: CategoryFilterProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();

  const labelFor = useCallback(
    (key: string) => {
      const v = labels?.[key];
      return typeof v === 'string' ? v : key;
    },
    [labels]
  );

  const isFiltered = value !== 'all';

  const close = useCallback((refocus = false) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }, []);

  // close on outside click and on Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopPropagation(); close(true); }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  // move focus onto the active option when the menu opens
  useEffect(() => {
    if (!open) return;
    const i = Math.max(0, options.indexOf(value));
    setActiveIndex(i);
    requestAnimationFrame(() => itemRefs.current[i]?.focus());
  }, [open, options, value]);

  const move = (delta: number) => {
    setActiveIndex((i) => {
      const next = (i + delta + options.length) % options.length;
      itemRefs.current[next]?.focus();
      return next;
    });
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
    else if (e.key === 'Home') { e.preventDefault(); setActiveIndex(0); itemRefs.current[0]?.focus(); }
    else if (e.key === 'End') {
      e.preventDefault();
      const last = options.length - 1;
      setActiveIndex(last);
      itemRefs.current[last]?.focus();
    }
  };

  const select = (key: string) => {
    onChange(key);
    close(true);
  };

  return (
    <div className="relative inline-block text-left" ref={wrapRef}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' && !open) { e.preventDefault(); setOpen(true); }
        }}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm md:text-base transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-2 focus-visible:ring-offset-black/40 ${
          isFiltered
            ? 'bg-[#FFD700] text-[#1a1a1a] font-bold shadow-md shadow-[#FFD700]/30'
            : 'bg-black/45 backdrop-blur-md border border-white/20 text-white/90 hover:bg-black/60 hover:text-white'
        }`}
      >
        <span>
          {filterByLabel}
          {isFiltered ? `: ${labelFor(value)}` : ''}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={filterByLabel}
          onKeyDown={onMenuKeyDown}
          className="absolute left-1/2 -translate-x-1/2 mt-2 z-50 w-[min(17rem,calc(100vw-2rem))] max-h-[min(20rem,60vh)] overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-black/80 backdrop-blur-md shadow-2xl p-1.5"
        >
          {options.map((key, i) => {
            const active = key === value;
            return (
              <button
                key={key}
                ref={(el) => { itemRefs.current[i] = el; }}
                type="button"
                role="menuitemradio"
                aria-checked={active}
                tabIndex={i === activeIndex ? 0 : -1}
                onClick={() => select(key)}
                className={`w-full flex items-center justify-between gap-3 text-left rounded-xl px-3.5 py-2.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] ${
                  active
                    ? 'bg-[#FFD700] text-[#1a1a1a] font-bold'
                    : 'text-white/90 hover:bg-white/15 hover:text-white'
                }`}
              >
                <span>{labelFor(key)}</span>
                {active && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
