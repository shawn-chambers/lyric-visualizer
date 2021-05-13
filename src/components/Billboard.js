import React from 'react';
import img from '../assets/photos/records2.jpg';

const Billboard = (props) => {
  return (
    <div className="billboard" style={{backgroundImage: `url(${img})`}}>
      <div className="billboard__text">
        <div className="billboard__text--header">
          Say What<span className="mark">?</span>
        </div>
        <div className="billboard__text--sub-header">
          an exploration of lyrical word choice and the relationship to chart position over time
        </div>
      </div>
    </div>
  )
}

export default Billboard