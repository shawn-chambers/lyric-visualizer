import React, { useEffect, useState, KeyboardEvent, MouseEvent } from 'react';

import { useAppContext } from '../context/AppContext';

const WordSearchBar: React.FC = () => {
  const { fetchSongsByWord, word, setWord } = useAppContext();
  const [term, setTerm] = useState<string>(word);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      setWord(term);
    }
  };

  useEffect(() => {
    fetchSongsByWord(word);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word]);

  return (
    <div className="search">
      <form>
        <input
          value={term}
          onKeyDown={handleKeyPress}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter a Word..."
        ></input>
        <button
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            setWord(term);
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default WordSearchBar;
