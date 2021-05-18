const express = require('express');
require('dotenv').config()
const port = process.env.PORT || 8080;
const app = express();
const compression = require('compression');
const morgan = require('morgan');
const lyricsRouter = require('./routes/lyricsRoutes.js');
const songsRouter = require('./routes/songsRoutes.js');

app.use(compression());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('*.gz', function (req, res, next) {
  if (req.headers['x-no-compression']) next();
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});
app.use(express.static('public'));


app.use('/api/lyrics', lyricsRouter);
app.use('/api/songs', songsRouter);

app.listen(port, () => console.log(`listening on port ${port}`));