const express = require('express');
const router = express.Router();

router
  .route('/:year')
  .get((req, res) => {
    console.log('helloooooo', req.params);
  });

module.exports = router;