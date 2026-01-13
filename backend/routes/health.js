import express from 'express';
const router = express.Router();
import { checkHealth } from '../controllers/health.js';

router.get('/', checkHealth);

export default router;
