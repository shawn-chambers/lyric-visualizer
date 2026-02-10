import React, { useState, useReducer, useEffect } from 'react';

import { useAppContext } from '../../context/AppContext';
import { LyricAction, LyricState, Song as SongType } from '../../../shared/types';
import Song from './Song';

const setInitialState = (songs: SongType[]): LyricState => {
  const initialState: LyricState = {};
  for (let i = 0; i < songs.length; i++) {
    initialState[i] = false;
  }
  return initialState;
};

const SongsList: React.FC = () => {
  const [showLyrics, setShowLyrics] = useState<number | null>(null);
  const { songs, fetchLyricsById, lyrics, setSongId } = useAppContext();

  const initialState = setInitialState(songs);

  useEffect(() => {
    if (lyrics.length === 0) {
      dispatch({ type: 'clear' });
    }
  }, [lyrics]);

  const lyricReducer = (prevState: LyricState, action: LyricAction): LyricState => {
    switch (action.type) {
      case 'click':
        if (action.payload) {
          const { num, display } = action.payload;
          const status = display === true ? false : true;
          return {
            ...initialState,
            [num]: status,
          };
        }
        return prevState;
      case 'clear':
        return {
          ...initialState,
        };
      default:
        return prevState;
    }
  };

  const [state, dispatch] = useReducer(lyricReducer, initialState);

  const selectSong = (action: LyricAction): void => {
    dispatch(action);
  };

  return (
    <div className="songs">
      <ul className="songs__list">
        {songs.map((song, i) => {
          return (
            <Song
              key={`${song.title}-${i}`}
              song={song}
              getLyrics={fetchLyricsById}
              lyrics={lyrics}
              handleDisplay={setShowLyrics}
              selectSong={selectSong}
              displayNum={showLyrics}
              songNum={i}
              setSongId={setSongId}
              display={state[i]}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default SongsList;
