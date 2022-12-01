const { Client } = require('pg');
require('dotenv').config();


// const client = new Client()
// Notes: Prod Restore DB
const client = new Client({
  connectionString: process.env.RENDER_DB,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => {
    // console.log('successful postgress connection');
    // Notes: Prod Restore DB
    console.log(`successful postgress connection to ${process.env.RENDER_DB}`);
  })
  .catch(() => {
    console.error('unsuccessful connection');
  });


module.exports = {
  db: client
}