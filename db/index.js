const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.PGUSER,
  host: 'localhost',
  database: process.env.PGDATABASE,
  password: null,
  port: 5432
});

client.connect()
  .then(() => {
    console.log(`successful postgress connection to ${process.env.PGDATABASE}`);
  })
  .catch(() => {
    console.error('unsuccessful connection');
  })


module.exports = {
  db: client
}