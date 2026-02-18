import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';

import { useAppContext } from '../context/AppContext';

import Billboard from './Billboard';
import CircleBarChart from './CircleBarChart';
import D3Chart from './D3Chart';
import Intro from './Intro';
import StickyHeader from './StickyHeader';
import WordSearchBar from './WordSearchBar';
import YearSearchBar from './YearSearchBar';
import Songs from './songs/SongsList';

const Dashboard: React.FC = () => {
  const { wordData, word, songs, setSongs, setLyrics, isLoadingWords } = useAppContext();
  const billboardRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [shadowLeft, setShadowLeft] = useState(false);
  const [shadowRight, setShadowRight] = useState(false);

  const updateShadows = useCallback(() => {
    const el = chipsRef.current;
    if (!el) return;
    setShadowLeft(el.scrollLeft > 0);
    setShadowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  const yearsWithResults = useMemo(() => {
    const yearCounts = new Map<number, number>();
    wordData.forEach((song) => {
      yearCounts.set(song.year, (yearCounts.get(song.year) || 0) + 1);
    });
    return Array.from(yearCounts.entries())
      .sort(([a], [b]) => a - b)
      .map(([year, count]) => ({ year, count }));
  }, [wordData]);

  useEffect(() => {
    updateShadows();
  }, [yearsWithResults, updateShadows]);

  useEffect(() => {
    if (!chipsRef.current || songs.length === 0) return;
    const activeChip = chipsRef.current.querySelector<HTMLElement>('.year-chips__chip--active');
    activeChip?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [songs]);

  const handleChipClick = (chipYear: number): void => {
    const selected = wordData.filter((song) => song.year === chipYear);
    setSongs(selected);
    setLyrics('');
  };

  return (
    <>
      <StickyHeader billboardRef={billboardRef} />
      <Billboard billboardRef={billboardRef} />
      <div className="dashboard">
        <section className="dashboard__section-intro">
          <Intro />
        </section>

        <section className="dashboard__section dashboard__section--year-exploration">
          <h2 className="dashboard__section-title">Explore by Year</h2>
          <p className="dashboard__section-desc">
            Select a year to see the top 10 most-used words across that year&apos;s Billboard Top 100.
          </p>
          <div className="dashboard__year-exploration">
            <YearSearchBar />
            <CircleBarChart />
          </div>
        </section>

        <section className="dashboard__section dashboard__section--word-search">
          <h2 className="dashboard__section-title">Search by Word</h2>
          <p className="dashboard__section-desc">
            Enter a word to see how many songs each year contained it. Click a bar to see the songs.
          </p>
          <div className="dashboard__word-exploration">
            <WordSearchBar />
            <D3Chart />
            {yearsWithResults.length > 0 && (
              <div className={`year-chips__wrapper${shadowLeft ? ' year-chips__wrapper--shadow-left' : ''}${shadowRight ? ' year-chips__wrapper--shadow-right' : ''}`}>
                <div className="year-chips" ref={chipsRef} onScroll={updateShadows}>
                  {yearsWithResults.map(({ year: chipYear, count }) => (
                    <button
                      key={chipYear}
                      className={`year-chips__chip ${songs.length > 0 && songs[0].year === chipYear ? 'year-chips__chip--active' : ''}`}
                      onClick={() => handleChipClick(chipYear)}
                    >
                      {chipYear} <span className="year-chips__count">({count})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {word.length ? (
              isLoadingWords ? (
                <div className="loading-state">
                  <div className="spinner" />
                </div>
              ) : (
                <div className="details">
                  <div className="total">
                    {wordData.length} songs used the word <span className="keyword">{word}</span>.
                  </div>
                  {songs.length ? (
                    <div className="selection">
                      {songs[0].year} had {songs.length} of those songs.{' '}
                      <span>(peaking at position {songs[0].position})</span>
                    </div>
                  ) : null}
                </div>
              )
            ) : null}
            <Songs />
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
