const { Pool } = require('pg');
require('dotenv').config();


// const client = new Client()
// Notes: Prod Restore DB
const pool = new Pool({
  connectionString: process.env.RENDER_DB,
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
    console.error('unsuccessful connection:', err);
  });


module.exports = {
  db: pool
}