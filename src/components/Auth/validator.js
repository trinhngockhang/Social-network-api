import { body } from 'express-validator/check';
import { checkValidateError } from '../../middleware';

export const loginValidator = [
  body('username').exists({ checkFalsy: true }),
  body('password').exists({ checkFalsy: true }),
  checkValidateError,
];
