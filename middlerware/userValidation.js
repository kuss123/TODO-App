import { check, body, param, query } from "express-validator";
export const validRegister = [
  body("password").default(undefined),
  body("name").default(undefined),
  body("email").default(undefined),

  check("name", "Name is required")
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage("name must be between 3 to 32 characters"),

  check("email", "Enter valid Email")
    .notEmpty()
    .isEmail()
    .withMessage("Must be a valid email address"),
  check("password", "Enter valid password")
    .isLength({ min: 6 })
    .matches(/(?=.*?[0-9])/)
    .withMessage(
      "Password must contain 6 letter with a character and a number"
    ),
];
