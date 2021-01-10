const express = require('express');
const router = express.Router();

const { getWordsByQuery } = require('../controllers/lyricsControllers');

router
  .route('/')
  .get(getWordsByQuery);

module.exports = router;