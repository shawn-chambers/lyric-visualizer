import { Request, Response } from 'express';

import { getLyrics, getSongs } from '../db/models/lyricsModels';

interface WordsQuery {
  year?: string;
  range?: string;
  position?: string;
}

export const getWordsByQuery = async (req: Request<object, object, object, WordsQuery>, res: Response): Promise<void> => {
  try {
    const year = req.query.year;
    const [start, end] = req.query.range ? req.query.range.split(',') : [undefined, undefined];
    const position = req.query.position;

    if (start && end) {
      const result = await getLyrics.byRange(Number(start), Number(end));
      res.status(200).send(result);
    } else if (year) {
      const result = await getLyrics.byYear(Number(year));
      res.status(200).send(result);
    } else if (position) {
      const result = await getLyrics.byPosition(Number(position));
      res.status(200).send(result);
    } else {
      throw new Error('incorrect search parameters');
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getSongsByWord = async (req: Request<{ word: string }>, res: Response): Promise<void> => {
  try {
    const word = req.params.word;
    const result = await getSongs.byWord(word);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
};

export const getLyricsFromId = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const result = await getLyrics.byId(id);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
};
