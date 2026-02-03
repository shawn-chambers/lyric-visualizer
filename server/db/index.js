const { Pool } = require('pg');
require('dotenv').config();


// const client = new Client()
// Notes: Prod Heroku DB
const client = new Client({
  connectionString: process.env.RENDER_DB,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => {
    console.log('successful postgress connection');
    // Notes: Prod Heroku DB
    // console.log(`successful postgress connection to ${process.env.RENDER_DB}`);
  })
  .catch((err) => {
    console.error('unsuccessful connection:', err);
  });


module.exports = {
  db: pool
}