const { Pool } = require('pg');
require('dotenv').config();


// const client = new Client()
// Notes: Prod Restore DB
const pool = new Pool({
  connectionString: 'postgres://shawn_chambers:14VIF8eXUfHmRmqmer2VVaIsQYBwDGv0@dpg-ce4g7u82i3mmvv4dpgo0-a.oregon-postgres.render.com/lyrics',
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => {
    // console.log('successful postgress connection');
    // Notes: Prod Restore DB
    console.log(`successful postgress connection to ${process.env.RENDER_DB}`);
  })
  .catch((err) => {
    console.error('unsuccessful connection:', err, process.env.RENDER_DB);
  });


module.exports = {
  db: pool
}