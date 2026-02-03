const { Client } = require('pg');
require('dotenv').config();


// const client = new Client()
// Notes: Render DB connection
const client = new Client({
  connectionString: process.env.RENDER_DB,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    // console.log('successful postgress connection');
    // Notes: Render DB connection
    console.log(`successful postgress connection to ${process.env.RENDER_DB}`);
  })
  .catch((err) => {
    console.error('unsuccessful connection:', err);
  });


module.exports = {
  db: client
}