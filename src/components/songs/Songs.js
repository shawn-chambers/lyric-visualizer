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

const Songs = () => {
  const [showLyrics, setShowLyrics] = useState(null);
  const { songs, fetchLyricsById, lyrics, setSongId } = useContext(AppContext);

  var initialState = setInitialState(songs);

  const lyricReducer = (prevState, action) => {
    switch (action.type) {
      case 'click':
        let { num, display } = action.payload;
        let status = display === true ? false : true;
        return {
          ...initialState,
          [num]: status,
        }
      default:
        console.log('default, oops');
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

export default Songs;