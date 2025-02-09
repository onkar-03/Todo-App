import { check } from 'express-validator';

export const LoginSchema = [
  check('username', 'username is required')
    .exists()
    .isAlphanumeric()
    .withMessage('username should be alphanumeric characters only')
    .trim()
    .isLength({ min: 3, max: 32 }),

  check('password', 'password is required')
    .exists()
    .isLength({ min: 3, max: 100 })
    .trim(),
];
