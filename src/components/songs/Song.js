import React, { useState, useEffect } from "react";
import Lyrics from "../Lyrics";

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
        <div className="song__info">
          <div className="top">
            <div className="song__info--title">
              {song.title}
            </div>
            <div className="song__info--artist">
              {song.artist}
            </div>
          </div>
          <div className="song__info--position">
            pos. {` ${song.position}`}
          </div>
        </div>
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