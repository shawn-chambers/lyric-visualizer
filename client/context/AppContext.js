import React, { useState, createContext } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvidor = (props) => {
  const [word, setWord] = useState('purple');
  const [wordData, setWordData] = useState([]);

  const fetchSongsByWord = (word) => {
    console.log(word);
    axios.get(`http://localhost:8080/api/songs/${word}`)
      .then(songs => {
        console.log(songs);
        setWordData(songs);
      })
      .catch((err) => {
        console.error('Error fetching songs:', err);
      });
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