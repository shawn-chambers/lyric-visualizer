import React, { useState, useEffect } from "react";
import Lyrics from "../Lyrics";

const Song = ({
  song,
  getLyrics,
  handleDisplay,
  displayNum,
  songNum,
  lyrics,
  setSongId,
  selectSong,
  display
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
    selectSong({ type: 'click', payload: {num, display } })
  }
  
  const toggleLyrics = (num, display) => {
    setDisplayLyrics(!displayLyrics);
    selectSong({ type: 'click', payload: {num, display } })
  }

  return (
    <div className="songs__list--container">
      <li className={`songs__list--song-container ${display ? 'selected' : ''}`} onClick={() => handleClick(song.id, songNum)}>
        <div className="song" >
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
      </li>
      {
        lyrics.length > 0
        && displayNum === songNum
        && displayLyrics
        && <Lyrics toggle={toggleLyrics} songNum={songNum} display={display}/>
      }
    </div>
  )
}

export default Song;