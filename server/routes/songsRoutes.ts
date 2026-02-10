import express from 'express';

import { getSongsByWord } from '../controllers/lyricsControllers';

const router = express.Router();

router.route('/:word').get(getSongsByWord);

export default router;
