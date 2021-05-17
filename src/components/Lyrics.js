import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';



export const Lyrics = () => {
  const { lyrics } = useContext(AppContext);

  return (
      <div dangerouslySetInnerHTML={{ __html: lyrics }} className="lyrics__text"></div>
  )
}

export default Lyrics;