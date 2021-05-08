const express = require('express');
const router = express.Router();

const { getWordsByQuery, getLyricsFromId } = require('../controllers/lyricsControllers');

router
  .route('/')
  .get(getWordsByQuery)
router
  .route('/:id')
  .get(getLyricsFromId)

module.exports = router;