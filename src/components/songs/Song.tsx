import React from 'react';

import { Song as SongType } from '../../../shared/types';

interface SongProps {
  song: SongType;
  onSongClick: (song: SongType) => void;
}

const Song: React.FC<SongProps> = ({ song, onSongClick }) => {
  return (
    <li className="songs__list--song-container" onClick={() => onSongClick(song)}>
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
  );
};

export default Song;
