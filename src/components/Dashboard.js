import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Song from './Song';

const Dashboard = () => {
  const { wordData, word, songs, fetchLyricsById, lyrics } = useContext(AppContext);

  const [showLyrics, setShowLyrics] = useState({ songNum: null })

  return (
    <>
      {
        word.length ?
          <div>There were {wordData.length} songs that used {word}!</div> : null
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
          />
        )
      })}
    </>
  )

}

export default Dashboard;