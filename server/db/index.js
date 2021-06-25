const { Client } = require('pg');
require('dotenv').config();


// const client = new Client()
// Notes: Prod Heroku DB
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    // console.log('successful postgress connection');
    // Notes: Prod Heroku DB
    console.log(`successful postgress connection to ${process.env.DATABASE_URL}`);
  })
  .catch(() => {
    console.error('unsuccessful connection');
  });


module.exports = {
  db: client
}