import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.RENDER_DB,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => {
    console.log(`successful postgres connection to ${process.env.RENDER_DB}`);
  })
  .catch((err: Error) => {
    console.error('unsuccessful connection:', err);
  });

export const db = client;
