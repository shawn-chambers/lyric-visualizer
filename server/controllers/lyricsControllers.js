// const db = require('../db/index');
const { getLyrics } = require('../db/models/lyricsModels');

module.exports.getWordsByYear = async (req, res) => {
  try {
    const year = req.params.year;
    const result = await getLyrics.byYear(year);
    res.status(200).send(result);
  } catch(err) {
    res.status(404).send(err);
  }
}