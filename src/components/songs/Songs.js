import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import Song from './Song';

const Songs = () => {
  const [showLyrics, setShowLyrics] = useState(null);
  const { songs, fetchLyricsById, lyrics, setSongId } = useContext(AppContext);

  return (
    <>
      {
        songs.map((song, i) => {
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
        })
      }
    </>
  )
}

export default Songs;