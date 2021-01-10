const express = require('express');
const router = express.Router();

const { getSongsByWord } = require('../controllers/lyricsControllers');

router
  .route('/:word')
  .get(getSongsByWord);

module.exports = router;