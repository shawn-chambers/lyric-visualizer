import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Song from './Song';

const Dashboard = () => {
  const { wordData, word, songs, fetchLyricsById, lyrics, setSongId } = useContext(AppContext);

  const [showLyrics, setShowLyrics] = useState(null)

  return (
    <>
      {
        word.length ?
          <div>{wordData.length} songs that used {word}.</div> : null
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