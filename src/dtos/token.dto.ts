import {body} from 'express-validator';


export const createTokenDto = [
  body("access_token")
    .isString()
    .notEmpty()
    .withMessage("Token not valid")
];
