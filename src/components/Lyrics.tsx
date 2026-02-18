import React from 'react';

import { useAppContext } from '../context/AppContext';

export const Lyrics: React.FC = () => {
  const { lyrics } = useAppContext();

  return <div dangerouslySetInnerHTML={{ __html: lyrics }} className="lyrics__text"></div>;
};

export default Lyrics;
