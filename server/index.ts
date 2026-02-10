import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import morgan from 'morgan';

import lyricsRouter from './routes/lyricsRoutes';
import songsRouter from './routes/songsRoutes';

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app.use(compression());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('*.gz', (req: Request, res: Response, next: NextFunction): void => {
  if (req.headers['x-no-compression']) {
    next();
    return;
  }
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.use(express.static('public'));

app.use('/api/lyrics', lyricsRouter);
app.use('/api/songs', songsRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
