import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import SearchBar from './SearchBar';
import BarChart from './BarChart';
import Song from './Song';

const Dashboard = () => {
  const { wordData, word, songs, fetchLyricsById, lyrics, setSongId } = useContext(AppContext);

  const [showLyrics, setShowLyrics] = useState(null)

  return (
    <>
      <SearchBar />
      <BarChart />
      {
        word.length ?
          <div className="details">{wordData.length} songs that used {word}.</div> : null
      }
      {songs.map((song, i) => {
        return (
          <Song
            key={`${song.title}-${i}`}
            song={song}
            getLyrics={fetchLyricsById}
            lyrics={lyrics}
            handleDisplay={setShowLyrics}
            displayNum={showLyrics}
            songNum={i}
            setSongId={setSongId}
          />
        )
      })}
    </>
  )

}

export default Dashboard;