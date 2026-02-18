import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

// const client = new Client({
//   database: 'songs',
// });
const client = new Client({
  connectionString: process.env.RENDER_DB,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => {
    // console.log('successful postgress connection');
    console.log(`successful postgres connection to ${process.env.RENDER_DB}`);
  })
  .catch((err: Error) => {
    console.error('unsuccessful connection:', err);
  });

export const db = client;
