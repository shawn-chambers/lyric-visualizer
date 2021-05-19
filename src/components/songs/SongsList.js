import React, { useState, useContext, useReducer, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Song from './Song';

const setInitialState = (songs) => {
  let iniialState = {}
  for (var i = 0; i < songs.length; i++) {
    iniialState[i] = false;
  }
  return iniialState;
}

const SongsList = () => {
  const [showLyrics, setShowLyrics] = useState(null);
  const { songs, fetchLyricsById, lyrics, setSongId } = useContext(AppContext);

  var initialState = setInitialState(songs);

  useEffect(() => {
    if (lyrics.length === 0) {
      dispatch({type: 'clear'})
    }
  }, [lyrics])

  const lyricReducer = (prevState, action) => {
    switch (action.type) {
      case 'click':
        let { num, display } = action.payload;
        let status = display === true ? false : true;
        return {
          ...initialState,
          [num]: status,
        }
      case 'clear':
        return {
          ...initialState
        }  
      default:
        return prevState;
    }
  }

  const [state, dispatch] = useReducer(lyricReducer, initialState);

  const selectSong = (action) => {
    dispatch(action);
  }

  return (
    <div className="songs">
      <ul className="songs__list">
        {
          songs.map((song, i) => {
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
            )
          })
        }
      </ul>
    </div>
  )
}

export default SongsList;