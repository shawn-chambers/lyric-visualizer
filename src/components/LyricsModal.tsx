import React, { useEffect, useState } from 'react';

import { Song } from '../../shared/types';

interface LyricsModalProps {
  song: Song;
  lyrics: string;
  onClose: () => void;
}

const LyricsModal: React.FC<LyricsModalProps> = ({ song, lyrics, onClose }) => {
  const [bodyScrolled, setBodyScrolled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__info">
            <h2 className="modal__title">{song.title}</h2>
            <p className="modal__artist">{song.artist}</p>
            <p className="modal__meta">#{song.position} &bull; {song.year}</p>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">&#x2715;</button>
        </div>
        <div
          className={`modal__body${bodyScrolled ? ' modal__body--scrolled' : ''}`}
          onScroll={(e) => setBodyScrolled(e.currentTarget.scrollTop > 0)}
        >
          {lyrics.length > 0 ? (
            <div className="modal__lyrics" dangerouslySetInnerHTML={{ __html: lyrics }} />
          ) : (
            <div className="modal__loading">
              <div className="spinner" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LyricsModal;
