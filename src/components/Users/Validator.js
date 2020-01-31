import { body } from 'express-validator/check';
import { checkValidateError } from '../../middleware';

export const commentValidator = [
  body('content').exists({ checkFalsy: true }),
  checkValidateError,
];
