const { Pool } = require('pg');
require('dotenv').config();


// const client = new Client()
// Notes: Prod Restore DB
const pool = new Pool({
  connectionString: String(process.env.RENDER_DB),
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(() => {
    // Notes: Prod Restore DB
    console.log('successful postgress connection');
  })
  .catch((err) => {
    console.error('unsuccessful connection:', err);
  });


module.exports = {
  db: pool
}