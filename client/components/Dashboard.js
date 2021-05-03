import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { wordData, word } = useContext(AppContext);

  // useState('')

  // useEffect(() => {

  // }, [wordData])

  return (
    <>
      {
        word.length ?
          <div>There were {wordData.length} songs that used {word}!</div> : null
      }
    </>
  )

}

export default Dashboard;