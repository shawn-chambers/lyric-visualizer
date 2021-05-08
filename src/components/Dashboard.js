import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import Song from './song';

const Dashboard = () => {
  const { wordData, word, songs, fetchLyricsById } = useContext(AppContext);

  return (
    <>
      {
        word.length ?
          <div>There were {wordData.length} songs that used {word}!</div> : null
      }
      {songs.map((song, i) => {
        return (
          <Song song={song} key={`${song.title}`} getLyrics={fetchLyricsById}/>
        )
      })}
    </>
  )

}

export default Dashboard;