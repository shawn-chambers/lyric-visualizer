import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import SearchBar from './SearchBar';
import Song from './Song';
import D3Chart from './D3Chart';
import Billboard from './Billboard';

const Dashboard = () => {
  const { wordData, word, songs, fetchLyricsById, lyrics, setSongId } = useContext(AppContext);

  const [showLyrics, setShowLyrics] = useState(null)

  return (
    <>
      <Billboard />
      <SearchBar />
      <D3Chart />

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