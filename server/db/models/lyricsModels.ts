import { QueryResult } from 'pg';

import { db } from '../index';
import { Song, WordStats, LyricsRecord } from '../../../shared/types';

interface GetLyrics {
  byYear: (year: number) => Promise<QueryResult<WordStats>>;
  byPosition: (position: number) => Promise<QueryResult<WordStats>>;
  byRange: (start: number, end: number) => Promise<QueryResult<WordStats>>;
  byId: (id: number) => Promise<QueryResult<LyricsRecord>>;
}

interface GetSongs {
  byWord: (word: string) => Promise<QueryResult<Song>>;
}

export const getLyrics: GetLyrics = {
  byYear: async (year: number): Promise<QueryResult<WordStats>> => {
    const text = `select * from ts_stat('select tokens from songs_copy where year=${year}') order by nentry desc;`;
    try {
      const words = await db.query<WordStats>(text);
      return words;
    } catch (err) {
      throw new Error(`error getting lyrics by year: ${(err as Error).message}`);
    }
  },
  byPosition: async (position: number): Promise<QueryResult<WordStats>> => {
    const text = `select * from ts_stat('select tokens from songs_copy where position=${position}') order by nentry desc;`;
    try {
      const words = await db.query<WordStats>(text);
      return words;
    } catch (err) {
      throw new Error(`error getting lyrics by position: ${(err as Error).message}`);
    }
  },
  byRange: async (start: number, end: number): Promise<QueryResult<WordStats>> => {
    const text = `select * from ts_stat('select tokens from songs_copy where position>=${start} and position<=${end}') order by nentry desc;`;
    try {
      const words = await db.query<WordStats>(text);
      return words;
    } catch (err) {
      throw new Error(`error getting lyrics by range: ${(err as Error).message}`);
    }
  },
  byId: async (id: number): Promise<QueryResult<LyricsRecord>> => {
    const text = `select lyrics from songs_copy where id=${id}`;
    try {
      const lyrics = await db.query<LyricsRecord>(text);
      return lyrics;
    } catch (err) {
      throw new Error(`error getting lyrics for song id ${id}: ${(err as Error).message}`);
    }
  },
};

export const getSongs: GetSongs = {
  byWord: async (word: string): Promise<QueryResult<Song>> => {
    const params = [word];
    const text =
      'select id, position, artist, title, year from songs_copy where tokens @@ plainto_tsquery($1) order by year asc, position asc;';
    try {
      const songs = await db.query<Song>(text, params);
      return songs;
    } catch (err) {
      console.log('error with query', err);
      throw new Error(`error getting songs by word: ${(err as Error).message}`);
    }
  },
};
