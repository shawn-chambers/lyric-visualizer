const express = require('express');
const port = process.env.PORT || 8080;
const app = express();
const morgan = require('morgan');
const lyricsRouter = require('./routes/lyricsRoutes.js');
const songsRouter = require('./routes/songsRoutes.js');

app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/api/lyrics', lyricsRouter);
app.use('/api/songs', songsRouter);

app.listen(port, () => console.log(`listening on port ${port}`));