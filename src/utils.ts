import { Song, WordStats, YearCount } from '../shared/types';

export const makeYears = (start: number, end: number): string[] => {
  const years: string[] = [];
  for (let i = start; i <= end; i++) {
    years.push(`${i}`);
  }
  return years;
};

export const formatLyrics = (lyrics: string, keyWord: string): string => {
  let str = lyrics.split('\n').join('<br>');
  const regEx1 = new RegExp(keyWord, 'g');
  str = str.replace(regEx1, '<b>' + keyWord + '</b>');
  const capitalizedKeyWord = keyWord.charAt(0).toUpperCase() + keyWord.slice(1);
  const regEx2 = new RegExp(capitalizedKeyWord, 'g');
  return str.replace(regEx2, '<b>' + capitalizedKeyWord + '</b>');
};

export const reduceSongsByYear = (data: Song[]): YearCount[] => {
  const years = makeYears(1970, 2025);
  const dataByYear = data.reduce<Record<string, number>>((acc, song) => {
    const yearStr = String(song.year);
    if (!acc[yearStr]) {
      acc[yearStr] = 1;
    } else {
      acc[yearStr]++;
    }
    return acc;
  }, {});

  const dataArr: YearCount[] = [];
  for (let i = 0; i < years.length; i++) {
    const count = dataByYear[years[i]] || 0;
    dataArr.push({ year: years[i], count });
  }
  return dataArr;
};

export const filterDataByYear = (year: string, data: YearCount[]): number => {
  let thisData = 0;
  for (let j = 0; j < data.length; j++) {
    if (data[j].year === year) {
      thisData = data[j].count;
      break;
    }
  }
  return thisData;
};

export const leastSquares = (xSeries: number[], ySeries: number[]): [number, number, number] => {
  const reduceSumFunc = (prev: number, cur: number): number => prev + cur;

  const xBar = (xSeries.reduce(reduceSumFunc) * 1.0) / xSeries.length;
  const yBar = (ySeries.reduce(reduceSumFunc) * 1.0) / ySeries.length;

  const ssXX = xSeries.map((d) => Math.pow(d - xBar, 2)).reduce(reduceSumFunc);
  const ssYY = ySeries.map((d) => Math.pow(d - yBar, 2)).reduce(reduceSumFunc);
  const ssXY = xSeries.map((d, i) => (d - xBar) * (ySeries[i] - yBar)).reduce(reduceSumFunc);

  const slope = ssXY / ssXX;
  const intercept = yBar - xBar * slope;
  const rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);

  return [slope, intercept, rSquare];
};

export const filterWordsByYear = (words: WordStats[]): WordStats[] => {
  const filtered = words
    .filter((wordObj) => {
      if (wordObj.word.length > 2 && wordObj.word !== 'ooh' && wordObj.word !== 'chh' && wordObj.word !== 'doo') {
        return true;
      }
      return false;
    })
    .map((wordObj) => {
      let newWordObj = { ...wordObj };
      if (newWordObj.word[newWordObj.word.length - 1] === 'v') {
        newWordObj = { ...newWordObj, word: newWordObj.word + 'e' };
      }
      if (newWordObj.word[newWordObj.word.length - 1] === 'i') {
        const newWord = newWordObj.word.replace(/.$/, 'y');
        newWordObj = { ...newWordObj, word: newWord };
      }
      if (newWordObj.word === 'littl') {
        newWordObj = { ...newWordObj, word: 'little' };
      }
      if (newWordObj.word === 'alway') {
        newWordObj = { ...newWordObj, word: 'always' };
      }
      if (newWordObj.word === 'togeth') {
        newWordObj = { ...newWordObj, word: 'together' };
      }
      if (newWordObj.word === 'everyth') {
        newWordObj = { ...newWordObj, word: 'everything' };
      }
      if (newWordObj.word === 'someth') {
        newWordObj = { ...newWordObj, word: 'something' };
      }
      if (newWordObj.word === 'danc') {
        newWordObj = { ...newWordObj, word: 'dance' };
      }
      if (newWordObj.word === 'caus') {
        newWordObj = { ...newWordObj, word: 'cause' };
      }
      if (newWordObj.word === 'won') {
        newWordObj = { ...newWordObj, word: 'wont' };
      }
      if (newWordObj.word === 'foreve') {
        newWordObj = { ...newWordObj, word: 'forever' };
      }
      if (newWordObj.word === 'pleas') {
        newWordObj = { ...newWordObj, word: 'please' };
      }
      if (newWordObj.word === 'promis') {
        newWordObj = { ...newWordObj, word: 'promise' };
      }
      if (newWordObj.word === 'chanc') {
        newWordObj = { ...newWordObj, word: 'chance' };
      }
      if (newWordObj.word === 'insid') {
        newWordObj = { ...newWordObj, word: 'inside' };
      }
      if (newWordObj.word === 'jungl') {
        newWordObj = { ...newWordObj, word: 'jungle' };
      }
      if (newWordObj.word === 'mayb') {
        newWordObj = { ...newWordObj, word: 'maybe' };
      }
      if (newWordObj.word === 'somewher') {
        newWordObj = { ...newWordObj, word: 'somewhere' };
      }
      if (newWordObj.word === 'ain') {
        newWordObj = { ...newWordObj, word: "ain't" };
      }
      return newWordObj;
    });
  return filtered;
};

export const colorArray: string[] = [
  '#127c88',
  '#127c88',
  '#158492',
  '#198e9e',
  '#1c97a9',
  '#1f9fb3',
  '#23aac1',
  '#27b4cd',
  '#2abcd7',
  '#2dc5e2',
  '#32d0ef',
  '#37ddff',
];
