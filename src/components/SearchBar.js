import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const SearchBar = (props) => {
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
    <form>
      <input
        value={term}
        onKeyDown={handleKeyPress}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="enter a word"
      >
      </input>
      <button onClick={(e) => { e.preventDefault(); setWord(term) }}>Search</button>
    </form>
  )
}

export default SearchBar;