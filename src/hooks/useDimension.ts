import { useRef, useState, useEffect, RefObject } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

import { Dimensions } from '../../shared/types';

const initialState: Dimensions = { width: 0, height: 0 };

const useDimension = (ref: RefObject<HTMLElement | null>): Dimensions => {
  const [dimensions, setDimensions] = useState<Dimensions>(initialState);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries: ResizeObserverEntry[] = []) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      });
    });
    if (ref.current) resizeObserverRef.current.observe(ref.current);
    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
    };
  }, [ref]);

  return dimensions;
};

export default useDimension;
