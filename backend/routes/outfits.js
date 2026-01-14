import express from 'express';
import { generateOutfit } from '../controllers/outfits.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', auth, generateOutfit);

export default router;
