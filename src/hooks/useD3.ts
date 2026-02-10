import { useRef, useEffect, DependencyList, RefObject } from 'react';
import * as d3 from 'd3';

type D3Selection = d3.Selection<SVGSVGElement | null, unknown, null, undefined>;

export const useD3 = (
  renderChartFn: (svg: D3Selection) => void,
  dependencies: DependencyList
): RefObject<SVGSVGElement | null> => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    renderChartFn(d3.select(ref.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return ref;
};
