import React from 'react';

import { useAppContext } from '../context/AppContext';

import Billboard from './Billboard';
import CircleBarChart from './CircleBarChart';
import D3Chart from './D3Chart';
import Intro from './Intro';
import WordSearchBar from './WordSearchBar';
import YearSearchBar from './YearSearchBar';
import Songs from './songs/SongsList';

const Dashboard: React.FC = () => {
  const { wordData, word, songs } = useAppContext();

  return (
    <>
      <Billboard />
      <Intro />
      <YearSearchBar />
      <CircleBarChart />
      <div className="tools-container">
        <WordSearchBar />
        <D3Chart />
      </div>
      {word.length ? (
        <>
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
        </>
      ) : null}
      <Songs />
    </>
  );
};

export default Dashboard;
