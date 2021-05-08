import React from "react";

const Song = ({song}) => {
  return (
    <div className="song">
      <div className="song__title">{song.title}</div>
      <div className="song__artist">{song.artist}</div>
      <div className="song__position">{`${song.position}`}</div>
    </div>
  )
}

export default Song;