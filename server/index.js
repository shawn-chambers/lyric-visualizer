const express = require('express');
const port = 8080;
const app = express();
const morgan = require('morgan');
const lyricsRouter = require('./routes/lyricsRoutes.js')

app.use(morgan('dev'));

app.use('/api/lyrics', lyricsRouter);

app.listen(port, () => console.log(`listening on port ${port}`));