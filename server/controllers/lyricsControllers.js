const { getLyrics, getSongs } = require('../db/models/lyricsModels');

module.exports.getWordsByQuery = async (req, res) => {
  try {
    const year = req.query.year;
    const [start, end] = req.query.range ? req.query.range.split(',') : [undefined, undefined];
    const position = req.query.position;

    if (start && end) {
      let result = await getLyrics.byRange(start, end);
      res.status(200).send(result);
    } else if (year) {
      let result = await getLyrics.byYear(year);
      res.status(200).send(result);
    } else if (position) {
      let result = await getLyrics.byPosition(position);
      res.status(200).send(result);
    } else {
      throw(new Error('incorrect search parameters'));
    }
  } catch(err) {
    res.status(404).send(err);
  }
}

module.exports.getSongsByWord = async (req, res) => {
  try {
    const word = req.params.word;
    const result = await getSongs.byWord(word);

    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
}