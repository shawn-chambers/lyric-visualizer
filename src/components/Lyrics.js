import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const Lyrics = ({toggle, songNum, display}) => {
  const { lyrics } = useContext(AppContext);

  return (
    <>
      {
          <div className="lyrics" onClick={() => toggle(songNum, display)}>
            <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
          </div>
      }
    </>
  )
}

export default Lyrics;