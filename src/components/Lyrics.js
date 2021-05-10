import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const Lyrics = ({toggle}) => {
  const { lyrics } = useContext(AppContext);

  return (
    <>
      {
          <div className="lyrics" onClick={toggle}>
            <div dangerouslySetInnerHTML={{ __html: lyrics }}></div>
          </div>
      }
    </>
  )
}

export default Lyrics;