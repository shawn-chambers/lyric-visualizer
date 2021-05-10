import React, { useState, useEffect } from "react";
import Lyrics from "./Lyrics";

const Song = ({ 
  song,
  getLyrics,
  handleDisplay,
  displayNum,
  songNum,
  lyrics
}) => {
  const [displayLyrics, setDisplayLyrics] = useState(false);

  useEffect(() => {
    setDisplayLyrics(true);
  }, [lyrics])

  const handleClick = (id, num) => {
    getLyrics(id);
    setDisplayLyrics(!displayLyrics)
    handleDisplay({ songNum: num, display: displayLyrics });
  }

  const toggleLyrics = () => {
    setDisplayLyrics(!displayLyrics);
  }

  return (
    <>
      <div className="song" onClick={() => handleClick(song.id, songNum)}>
        <div className="song__title">{song.title}</div>
        <div className="song__artist">{song.artist}</div>
        <div className="song__position">{`${song.position}`}</div>
      </div >
      {lyrics.length > 0 && displayNum.songNum === songNum && displayLyrics && <Lyrics toggle={toggleLyrics}/>}
    </>
  )
}

export default Song;