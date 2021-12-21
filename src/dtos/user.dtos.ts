import {body} from 'express-validator';


export const createUserDto = [
  body("email")
    .isString()
    .isEmail()
    .notEmpty()
    .withMessage("Email not valid"),

  body("password")
    .notEmpty()
    .isString()
    .isLength({max:20, min:3})
    .withMessage("Not valid password"),

  body("username")
    .notEmpty()
    .isString()
    .withMessage("Please provide correct username"),
];
