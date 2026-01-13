import express from 'express';
import { register, login, profile } from '../controllers/auth.js';
import { validate } from '../middleware/validate.js';
import { auth } from '../middleware/auth.js';
import { check } from 'express-validator';

const router = express.Router();

router.post(
  '/register',
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Enter a valid email address'),
    check('password').not().isEmpty().withMessage('Password is required'),
  ],
  validate,
  login
);

router.get('/profile', auth, profile);

export default router;
