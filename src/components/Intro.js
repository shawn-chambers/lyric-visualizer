import React from 'react';

const Intro = () => {

  return (
    <div className="intro">
      <p>What makes popular songs popular? Is there a word or a phrase that makes up the secret sauce to a Billboard hit? Does that secret sauce have to change its flavor over time? Stripping songs away from musical trends, I decided to focus on lyrical trends and how the use of specific language equates to popularity over time in the context of Billboard's yearly top 100.</p>
      <p>Data has been pulled from over 5000 Billboard Top 100 songs from 1970 to the present. After gathering the lyrics, artists and peak positions of all 5000 top songs I made an interactive tool to help others explore the data. Enter a word in the search bar and the chart will display how many songs each year contained that word. To explore further, click a year of the chart to see a list of each song, then click a song to display the lyrics and usage of the word that was searched.</p>
    </div>
  )
}

export default Intro;