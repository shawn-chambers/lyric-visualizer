const express = require('express');
const router = express.Router();

const { getWordsByYear } = require('../controllers/lyricsControllers');

router
  .route('/:year')
  .get(getWordsByYear);

module.exports = router;