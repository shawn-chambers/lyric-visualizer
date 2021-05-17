import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';



export const Lyrics = ({ toggle, songNum, display }) => {
  const { lyrics } = useContext(AppContext);

  return (
    <div onClick={() => toggle(songNum, display)}>
      <div dangerouslySetInnerHTML={{ __html: lyrics }} className="lyrics__text"></div>
    </div>
  )
}

export default Lyrics;