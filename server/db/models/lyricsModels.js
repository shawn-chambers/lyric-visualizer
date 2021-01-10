const { db } = require('../index');

module.exports.getLyrics = {
  byYear: async (year) => {
    const text = `select * from ts_stat('select tokens from songs_copy where year=${year}') order by nentry desc;`;
    try {
      const words = await db.query(text);
      return words;
    } catch (err) {
      throw ('error geting lyrics by year', err.stack);
    }
  }
}

module.exports.search = {
  byWord: async (word) => {
    const params = [word];
    const text = 'select id, position, artist, title, year from songs_copy where tokens @@ plainto_tsquery($1) order by year asc, position asc;';
    try {
      const songs = await db.query(text, params);
      return songs;
    } catch (err) {
      console.log('error with query', err);
      throw ('error geting songs by word', err);
    }
  }
}