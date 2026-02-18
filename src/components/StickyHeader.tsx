import React, { useEffect, useState } from 'react';

interface StickyHeaderProps {
  billboardRef: React.RefObject<HTMLDivElement>;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ billboardRef }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    let observer: IntersectionObserver | null = null;

    const setup = (mobile: boolean) => {
      observer?.disconnect();
      if (!mobile) {
        setVisible(false);
        return;
      }
      const billboard = billboardRef.current;
      if (!billboard) return;
      observer = new IntersectionObserver(
        ([entry]) => setVisible(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(billboard);
    };

    setup(mq.matches);
    mq.addEventListener('change', (e) => setup(e.matches));
    return () => {
      observer?.disconnect();
      mq.removeEventListener('change', (e) => setup(e.matches));
    };
  }, [billboardRef]);

  return (
    <header className={`sticky-header ${visible ? 'sticky-header--visible' : ''}`}>
      <span className="sticky-header__title">
        Say What?
        <a
          className="sticky-header__author"
          href="https://shawnchambers.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          by Shawn Chambers
        </a>
      </span>
    </header>
  );
};

export default StickyHeader;
