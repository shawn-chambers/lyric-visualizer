const express = require('express');
const router = express.Router();

const lyricsControllers = require('../controllers/lyricsControllers');

router
  .route('/:year')
  .get(lyricsControllers.getWordsByYear);

module.exports = router;