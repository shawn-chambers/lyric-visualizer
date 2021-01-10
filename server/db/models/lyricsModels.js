const { db } = require('../index');

module.exports.getLyrics = {
  byYear: async (year) => {
    const text = `select * from ts_stat('select tokens from songs_copy where year=${year}') order by nentry desc;`;
    try {
      const words = await db.query(text);
      return words;
    } catch (err) {
      console.log('error geting lyrics by year', err.stack)
    }
  }
}