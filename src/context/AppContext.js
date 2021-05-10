import React, { useState, createContext } from 'react';
import { formatLyrics } from '../utils';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState([]);
  const [songs, setSongs] = useState([]);
  const [lyrics, setLyrics] = useState('');

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

  const fetchLyricsById = (id) => {
    if (id) {
      axios.get(`http://localhost:3030/api/lyrics/${id}`)
        .then(({data}) => {
          let lyrics = data.rows[0].lyrics;
          let html = formatLyrics(lyrics);
          setLyrics(html);
        })
        .catch(err => {
          console.error('Error fetching lyrics:', err);
        })
    }
  }

  return (
    <AppContext.Provider
      value={{
        fetchSongsByWord,
        fetchLyricsById,
        wordData,
        word,
        setWord,
        songs,
        setSongs,
        lyrics,
        setLyrics
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};