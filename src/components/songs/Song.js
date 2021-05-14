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
          <span className="song__info--label">
            Song: {' '}
          </span>
          <span className="song__info--variable">
            {song.title}
          </span>
        </div>
        <div className="song__info">
          <span className="song__info--label">
            Artist: {' '}
          </span>
          <span className="song__info--variable">
            {song.artist}
          </span>
        </div>
        <div className="song__info">
          <span className="song__info--label">
            Position: {' '}
          </span>
          <span className="song__info--variable">
            {`${song.position}`}
          </span>
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