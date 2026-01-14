import express from 'express';
import {
  getWardrobeItems,
  addWardrobeItem,
  deleteWardrobeItem,
} from '../controllers/wardrobe.js';
import { auth } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', auth, getWardrobeItems);
router.post('/', auth, upload.single('image'), addWardrobeItem);
router.delete('/:id', auth, deleteWardrobeItem);

export default router;
