export const makeYears = (start, end) => {
  let years = [];
  for (var i = start; i <= end; i++) {
    years.push(`${i}`);
  }
  return years
}

export const formatLyrics = (lyrics, keyWord) => {
  let str = lyrics.split('\n').join('<br>');
  const regEx1 = new RegExp(keyWord, 'g');
  str = str.replace(regEx1, '<b>' + keyWord + '</b>')
  keyWord = keyWord.charAt(0).toUpperCase() + keyWord.slice(1)
  const regEx2 = new RegExp(keyWord, 'g');
  return str.replace(regEx2, '<b>' + keyWord + '</b>');
}

export const reduceSongsByYear = (data) => {
  let years = makeYears(1970, 2020);
  let dataByYear = data.reduce((acc, song) => {
    if (!acc[song['year']]) {
      acc[song['year']] = 1;
    } else {
      acc[song['year']]++;
    }
    return acc;
  }, {});

  let dataArr = [];

  for (let i = 0; i < years.length; i++) {
    let count = dataByYear[years[i]] || 0;
    dataArr.push({ year: years[i], count });
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

export const leastSquares = (xSeries, ySeries) => {
  var reduceSumFunc = (prev, cur) => prev + cur;

  var xBar = xSeries.reduce(reduceSumFunc) * 1.0 / xSeries.length;
  var yBar = ySeries.reduce(reduceSumFunc) * 1.0 / ySeries.length;

  var ssXX = xSeries.map((d) => Math.pow(d - xBar, 2))
    .reduce(reduceSumFunc);

  var ssYY = ySeries.map((d) => Math.pow(d - yBar, 2))
    .reduce(reduceSumFunc);

  var ssXY = xSeries.map((d, i) => (d - xBar) * (ySeries[i] - yBar))
    .reduce(reduceSumFunc);

  var slope = ssXY / ssXX;
  var intercept = yBar - (xBar * slope);
  var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);

  return [slope, intercept, rSquare];
}

export const filterWordsByYear = (words) => {
  let filtered = words.filter((wordObj) => {
    if (wordObj.word.length > 2) {
      return wordObj;
    } 
  }).map((wordObj) => {
    if (wordObj.word[wordObj.word.length - 1] === 'v') {
      wordObj = {...wordObj, word: wordObj.word += 'e'}
    }
    if (wordObj.word[wordObj.word.length -1] === 'i') {
      let newWord = wordObj.word.replace(/.$/, 'y');
      wordObj = {...wordObj, word: newWord}
    }
    if (wordObj.word === 'littl') {
      wordObj = {...wordObj, word: 'little'}
    }
    if (wordObj.word === 'alway') {
      wordObj = {...wordObj, word: 'always'}
    }
    if (wordObj.word === 'togeth') {
      wordObj = {...wordObj, word: 'together'}
    }
    if (wordObj.word === 'everyth') {
      wordObj = {...wordObj, word: 'everything'}
    }
    if (wordObj.word === 'danc') {
      wordObj = {...wordObj, word: 'dance'}
    }
    return wordObj;
  })
  console.log('filtered words', filtered);
}