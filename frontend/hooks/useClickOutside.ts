import { useEffect, useLayoutEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);
  const cbRef = useRef(onClose);

  useLayoutEffect(() => {
    cbRef.current = onClose;
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        cbRef.current();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return ref;
}
