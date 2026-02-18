import express from 'express';

import { getWordsByQuery, getLyricsFromId } from '../controllers/lyricsControllers';

const router = express.Router();

router.route('/').get(getWordsByQuery);
router.route('/:id').get(getLyricsFromId);

export default router;
