import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import WordSearchBar from './WordSearchBar';
import Songs from './songs/SongsList';
import D3Chart from './D3Chart';
import Billboard from './Billboard';
import Intro from './Intro';
import YearSearchBar from './YearSearchBar';
import CircleBarChart from './CircleBarChart';

const Dashboard = () => {
  const { wordData, word, songs } = useContext(AppContext);

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
      {
        word.length ?
          <>
            <div className="details">
              <div className="total">
                {wordData.length} songs used the word <span className="keyword">{word}</span>.
              </div>
              {songs.length ?
                <div className="selection">
                  {songs[0].year} had {songs.length} of those songs. <span>(peaking at position {songs[0].position})</span>
              </div> : null
              }
            </div>
          </>
          : null
      }
      <Songs />
    </>
  )

}

export default Dashboard;