import React, { useState, useEffect } from "react";
import Lyrics from "./Lyrics";

const Song = ({
  song,
  getLyrics,
  handleDisplay,
  displayNum,
  songNum,
  lyrics,
  setSongId
}) => {
  const [displayLyrics, setDisplayLyrics] = useState(false);

  useEffect(() => {
    setDisplayLyrics(true);
  }, [lyrics])

  const handleClick = (id, num) => {
    setSongId(id);
    getLyrics(id);
    setDisplayLyrics(!displayLyrics);
    handleDisplay(num);
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
      {
        lyrics.length > 0
        && displayNum === songNum
        && displayLyrics
        && <Lyrics toggle={toggleLyrics} />
      }
    </>
  )
}

export default Song;