import React, { useState, createContext } from 'react';
import { formatLyrics, filterWordsByYear } from '../utils';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [word, setWord] = useState('');
  const [wordData, setWordData] = useState([]);
  const [songs, setSongs] = useState([]);
  const [lyrics, setLyrics] = useState('');
  const [songId, setSongId] = useState(null);
  const [year, setYear] = useState('');
  const [wordsByYear, setWordsByYear] = useState([]);

  const fetchSongsByWord = (query) => {
    if (query.length > 0) {
      axios.get(`/api/songs/${query}`)
        .then(songs => {
          setWordData(songs.data.rows);
        })
        .catch((err) => {
          console.error('Error fetching songs:', err);
        });
    }
  };

  const fetchLyricsById = (id) => {
    if (id !== songId) {
      axios.get(`/api/lyrics/${id}`)
        .then(({ data }) => {
          const lyrics = data.rows[0].lyrics;
          const html = formatLyrics(lyrics, word);
          setLyrics(html);
        })
        .catch(err => {
          console.error('Error fetching lyrics:', err);
        })
    }
  }

  const fetchWordsByYear = (year) => {
    if (year > 0) {
      axios.get(`/api/lyrics/?year=${year}`)
        .then(({ data }) => {
          let filteredWords = filterWordsByYear(data.rows);
          setWordsByYear(filteredWords);
        })
        .catch(err => {
          console.error('Error fetching words by year:', err);
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
        setLyrics,
        setSongId,
        fetchWordsByYear,
        year,
        setYear,
        wordsByYear,
        setWordsByYear
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};