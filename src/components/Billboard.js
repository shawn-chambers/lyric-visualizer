import React from 'react';
import img from '../assets/photos/records2.jpg';

const Billboard = (props) => {
  return (
    <div className="billboard" style={{ backgroundImage: `url(${img})` }}>
      <div className="billboard__text">
        <div className="billboard__text--header">
          Say What<span className="mark">?</span>
        </div>
        <div className="billboard__text--sub-header">
          an exploration of lyrical word choice and the relationship to chart position over time
        </div>
        <div className="billboard__text--author">
          by <a href="https://shawnchambers.dev" target="_blank" rel="noreferrer noopener">Shawn Chambers</a>
        </div>
      </div>
    </div>
  )
}

export default Billboard