import React, { useRef, CSSProperties } from 'react';

import useDimension from '../../hooks/useDimension';
import { SongProps } from '../../../shared/types';
import Lyrics from '../Lyrics';

const Song: React.FC<SongProps> = ({
  song,
  getLyrics,
  handleDisplay,
  displayNum,
  songNum,
  lyrics,
  setSongId,
  selectSong,
  display,
}) => {
  const displayLyrics = lyrics.length > 0;
  const lyricDivRef = useRef<HTMLDivElement>(null);
  const { height } = useDimension(lyricDivRef);

  const setHeight = (isDisplayed: boolean): CSSProperties => {
    let newHeight: string = '';

    // NOTES: may need updating for browser compatibility
    if (navigator.appVersion.indexOf('Chrome') === -1 && navigator.appVersion.indexOf('Safari') === -1) {
      newHeight = '-moz-fit-content';
    } else {
      newHeight = '-webkit-fit-content';
    }

    if (isDisplayed) {
      return {
        maxHeight: '2000px',
        height: newHeight,
        opacity: 1,
      };
    } else {
      return {
        maxHeight: '1px',
        height: height,
        opacity: 0,
      };
    }
  };

  const handleClick = (id: number, num: number): void => {
    setSongId(id);
    getLyrics(id);
    handleDisplay(num);
    selectSong({ type: 'click', payload: { num, display } });
  };

  return (
    <div className="songs__list--container">
      <li
        className={`songs__list--song-container ${display ? 'selected' : ''}`}
        onClick={() => handleClick(song.id, songNum)}
      >
        <div className="song">
          <div className="song__info">
            <div className="top">
              <div className="song__info--title">{song.title}</div>
              <div className="song__info--artist">{song.artist}</div>
            </div>
            <div className="song__info--position">pos. {` ${song.position}`}</div>
          </div>
        </div>
      </li>
      <div style={setHeight(display)} className="lyrics" ref={lyricDivRef}>
        {lyrics.length > 0 && displayNum === songNum && displayLyrics ? (
          <Lyrics />
        ) : (
          <div style={{ height: '1px' }}></div>
        )}
      </div>
    </div>
  );
};

export default Song;
