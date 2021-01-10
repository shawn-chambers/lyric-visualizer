const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: 'localhost',
  database: process.env.PGDATABASE,
  password: null,
  port: process.env.PGPORT
});

pool.connect()
  .then(() => {
    console.log(`successful postgress connection to ${process.env.PGDATABASE}`);
  })
  .catch(() => {
    console.error('unsuccessful connection');
  })


module.exports = {
  db: pool
}