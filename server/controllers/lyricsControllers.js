const { getLyrics, search } = require('../db/models/lyricsModels');

module.exports.getWordsByYear = async (req, res) => {
  try {
    const year = req.params.year;
    const result = await getLyrics.byYear(year);
    res.status(200).send(result);
  } catch(err) {
    res.status(404).send(err);
  }
}

module.exports.getSongsByWord = async (req, res) => {
  try {
    const word = req.params.word;
    const result = await search.byWord(word);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
}