import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { wordData, word, songs } = useContext(AppContext);

  // useState('')

  // useEffect(() => {

  // }, [wordData])

  return (
    <>
      {
        word.length ?
          <div>There were {wordData.length} songs that used {word}!</div> : null
      }
      <ul>
        {songs.map((song, i) => {
          return (
            <li>{song.title} by {song.artist} at position: {song.position}</li>
          )
        })}
      </ul>
    </>
  )

}

export default Dashboard;