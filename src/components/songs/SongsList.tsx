import React, { useState } from 'react';

import { Song as SongType } from '../../../shared/types';
import { useAppContext } from '../../context/AppContext';
import LyricsModal from '../LyricsModal';

import Song from './Song';

const SongsList: React.FC = () => {
  const { songs, fetchLyricsById, lyrics, setSongId, setLyrics } = useAppContext();
  const [selectedSong, setSelectedSong] = useState<SongType | null>(null);

  const handleSongClick = (song: SongType): void => {
    setSongId(song.id);
    fetchLyricsById(song.id);
    setSelectedSong(song);
  };

  const handleClose = (): void => {
    setSelectedSong(null);
    setLyrics('');
  };

  if (songs.length === 0) return null;

  return (
    <div className="songs">
      <ul className="songs__list">
        {songs.map((song, i) => (
          <Song key={`${song.title}-${i}`} song={song} onSongClick={handleSongClick} />
        ))}
      </ul>
      {selectedSong && (
        <LyricsModal song={selectedSong} lyrics={lyrics} onClose={handleClose} />
      )}
    </div>
  );
};

export default SongsList;
