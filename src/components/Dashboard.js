import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import SearchBar from './SearchBar';
import Songs from './songs/Songs';
import D3Chart from './D3Chart';
import Billboard from './Billboard';

const Dashboard = () => {
  const { wordData, word } = useContext(AppContext);

  return (
    <>
      <Billboard />
      <SearchBar />
      <D3Chart />
      {
        word.length ?
          <div className="details">{wordData.length} songs that used {word}.</div> : null
      }
      <Songs />
    </>
  )

}

export default Dashboard;