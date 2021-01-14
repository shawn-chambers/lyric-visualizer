import React, { useState, createContext } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvidor = (props) => {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState([]);

  const fetchSongsByWord = (query) => {
    if (query.length > 0) {
      axios.get(`http://localhost:8080/api/songs/${query}`)
      .then(songs => {
        console.log('results from query', query + ':', songs.data.rows);
        setWordData(songs.data.rows);
      })
      .catch((err) => {
        console.error('Error fetching songs:', err);
      });
    }
  };


  return (
    <AppContext.Provider
      value={{
        fetchSongsByWord,
        wordData,
        word,
        setWord
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};