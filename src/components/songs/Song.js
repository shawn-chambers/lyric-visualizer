import React, { useState, useEffect, useRef } from "react";
import Lyrics from "../Lyrics";
import useDimension from "../../hooks/useDimension";


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
  
  const setHeight = (display) => {
    if (display) {
      return {
        maxHeight: "2000px",
        height: "fit-content",
        opacity: 1,
        width: "130%",
        position: 'relative',
        right: "15%"
      }
    } else {
      return {
        maxHeight: "1px",
        height: height,
        opacity: 0
      }
    }
  }
  const lyricDivRef = useRef(null);
  const { height } = useDimension(lyricDivRef);

  useEffect(() => {
    setDisplayLyrics(true);
  }, [lyrics])

  const handleClick = (id, num) => {
    setSongId(id);
    getLyrics(id);
    setDisplayLyrics(!displayLyrics);
    handleDisplay(num);
    selectSong({ type: 'click', payload: { num, display } })
  }

  const toggleLyrics = (num, display) => {
    selectSong({ type: 'click', payload: { num, display } })
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
      <div style={setHeight(display)} className="lyrics" ref={lyricDivRef}>
        {
(          lyrics.length > 0
          && displayNum === songNum
          && displayLyrics)
          ? <Lyrics toggle={toggleLyrics} songNum={songNum} display={display} /> : <div style={{height: "1px"}}></div>
        }
      </div>
    </div>
  )
}

export default Song;