import React, { useState, createContext } from 'react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState([]);

  const fetchSongsByWord = (query) => {
    if (query.length > 0) {
      axios.get(`http://localhost:3030/api/songs/${query}`)
        .then(songs => {
          setWordData(songs.data.rows);
        })
        .catch((err) => {
          console.error('Error fetching songs:', err);
        });
    }
  };

  const makeSongsByYear = (data) => {
    let dataByYear = data.reduce((acc, song) => {
      if (!acc[song['year']]) {
        acc[song['year']] = 1;
      } else {
        acc[song['year']]++;
      }
      return acc;
    }, {});

    let dataArr = [];

    for (let year in dataByYear) {
      dataArr.push({ year: year, count: dataByYear[year] });
    }
    return dataArr;
  }


  return (
    <AppContext.Provider
      value={{
        fetchSongsByWord,
        wordData,
        word,
        setWord,
        makeSongsByYear
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};