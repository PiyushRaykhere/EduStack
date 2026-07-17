import { useEffect, useRef } from 'react';

/**
 * useScrollReveal
 *
 * Attaches an IntersectionObserver to the ref'd element and adds the given
 * CSS class when it enters the viewport. Once added the class sticks — the
 * element does not hide again when scrolling back up.
 *
 * Compatible with React 19's stricter ref handling because this hook:
 *  - Never updates state from the observer callback (avoids the re-render →
 *    observer-recreate loop that causes the markRef error during route
 *    transitions).
 *  - Uses DOM classList directly via a stable ref.
 *
 * @param {string} revealClass  CSS class to add when visible (default: 'reveal')
 * @param {object} [opts]
 * @param {boolean} [opts.once=true]       disconnect after first reveal
 * @param {number}  [opts.threshold=0.15]  fraction of element visible to trigger
 * @returns {React.RefObject<HTMLElement>}
 */
export default function useScrollReveal(revealClass, opts) {
  // This class is ADDED to the element when it enters the viewport.
  // The element should already carry the static "reveal-up" class in its
  // className (which defines the hidden/starting state via CSS).
  const className = revealClass || 'is-revealed';
  const { once = true, threshold = 0.15 } = (opts || {});
  const ref = useRef(null);
  const revealOnce = useRef(once);
  const thresholdVal = useRef(threshold);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(className);
          if (revealOnce.current) observer.disconnect();
        }
      },
      { threshold: thresholdVal.current }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [className]);

  return ref;
}
