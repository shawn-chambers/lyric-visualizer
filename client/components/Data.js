import React, { useContext, useEffect } from 'react';
import * as d3 from 'd3';

import { AppContext } from '../context/AppContext';

const Data = (props) => {
  const { fetchSongsByWord, word } = useContext(AppContext);

  useEffect(() => {
    fetchSongsByWord(word);
  }, [word])

  return (
    <>
    </>
  )
}

export default Data;