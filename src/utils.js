export const formatLyrics = (lyrics) => {
  return lyrics.split('\n').join('<br>');
}

export const makeSongsByYear = (data) => {
  let dataByYear = data.reduce((acc, song) => {
    if (!acc[song['year']]) {
      acc[song['year']] = 1;
    } else {
      acc[song['year']]++;
    }
    return acc;
  }, {});

  let dataArr = [];

  for (let year in dataByYear) {
    dataArr.push({ year: year, count: dataByYear[year] });
  }
  return dataArr;
}