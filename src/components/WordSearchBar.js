import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const WordSearchBar = () => {
  const { fetchSongsByWord, word, setWord } = useContext(AppContext);
  const [term, setTerm] = useState(word);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setWord(term);
    }
  }

  useEffect(() => {
    fetchSongsByWord(word);
  }, [word])

  return (
    <div className="search">
      <form>
        <input
          value={term}
          onKeyDown={handleKeyPress}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter a Word..."
        >
        </input>
        <button onClick={(e) => { e.preventDefault(); setWord(term) }}>Search</button>
      </form>
    </div>
  )
}

export default WordSearchBar;