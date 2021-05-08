import React from "react";

const Song = ({ song, getLyrics }) => {
  return (
    <div className="song" onClick={() => getLyrics(song.id)}>
      <div className="song__title">{song.title}</div>
      <div className="song__artist">{song.artist}</div>
      <div className="song__position">{`${song.position}`}</div>
    </div >
  )
}

export default Song;