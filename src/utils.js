export const formatLyrics = (lyrics, keyWord) => {
  let str = lyrics.split('\n').join('<br>');
  const regEx1 = new RegExp(keyWord, 'g');
  str = str.replace(regEx1, '<b>'+ keyWord + '</b>')
  keyWord = keyWord.charAt(0).toUpperCase() + keyWord.slice(1)
  const regEx2 = new RegExp(keyWord, 'g');
  return str.replace(regEx2, '<b>'+ keyWord + '</b>');
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
