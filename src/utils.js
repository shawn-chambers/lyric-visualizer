export const formatLyrics = (lyrics) => {
  return lyrics.split('\n').join('<br>');
}

export const reduceSongsByYear = (data) => {
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

export const filterDataByYear = (year, data) => {
  let thisData = 0;
  for (let j = 0; j < data.length; j++) {
      if (data[j].year === year) {
          thisData = data[j].count
          break;
      }
  }
  return thisData
}
