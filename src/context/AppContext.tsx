import React, { useState, useRef, createContext, useContext, ReactNode } from 'react';
import axios from 'axios';

import { formatLyrics, filterWordsByYear } from '../utils';
import { Song, WordStats, AppContextValue } from '../../shared/types';

export const AppContext = createContext<AppContextValue | undefined>(undefined);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const [word, setWord] = useState<string>('');
  const [wordData, setWordData] = useState<Song[]>([]);
  const [isLoadingWords, setIsLoadingWords] = useState<boolean>(false);
  const [loadingPhrase, setLoadingPhrase] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [lyrics, setLyrics] = useState<string>('');
  const [songId, setSongId] = useState<number | null>(null);
  const lyricsCache = useRef<Map<number, string>>(new Map());
  const [year, setYear] = useState<number | string>('');
  const [wordsByYear, setWordsByYear] = useState<WordStats[]>([]);

  const LOADING_PHRASES = [
    'Fetching lyric data...',
    'Getting billboard statistics...',
    'Loading song data...',
    'Organizing lyrics...',
  ] as const;

  const fetchSongsByWord = (query: string): void => {
    if (query.length > 0) {
      setIsLoadingWords(true);
      setLoadingPhrase(LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)]);
      setSongs([]);
      axios
        .get(`/api/songs/${query}`)
        .then((response) => {
          setWordData(response.data.rows);
        })
        .catch((err: Error) => {
          console.error('Error fetching songs:', err);
        })
        .finally(() => {
          setIsLoadingWords(false);
        });
    }
  };

  const fetchLyricsById = (id: number): void => {
    const cached = lyricsCache.current.get(id);
    if (cached !== undefined) {
      setLyrics(cached);
      return;
    }
    axios
      .get(`/api/lyrics/${id}`)
      .then(({ data }) => {
        const lyricsText = data.rows[0].lyrics;
        const html = formatLyrics(lyricsText, word);
        lyricsCache.current.set(id, html);
        setLyrics(html);
      })
      .catch((err: Error) => {
        console.error('Error fetching lyrics:', err);
      });
  };

  const fetchWordsByYear = (yearParam: number): void => {
    if (yearParam > 0) {
      axios
        .get(`/api/lyrics/?year=${yearParam}`)
        .then(({ data }) => {
          const filteredWords = filterWordsByYear(data.rows);
          setWordsByYear(filteredWords);
        })
        .catch((err: Error) => {
          console.error('Error fetching words by year:', err);
        });
    }
  };

  const value: AppContextValue = {
    fetchSongsByWord,
    fetchLyricsById,
    wordData,
    isLoadingWords,
    loadingPhrase,
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
    setWordsByYear,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextValue => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
