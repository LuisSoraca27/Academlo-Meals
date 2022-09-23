const { body, validationResult } = require("express-validator");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return res.status(400).json({
      status: "error",
      message,
    });
  }

  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createRestaurantsValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("address")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters"),
  body("rating")
  .isNumeric()
  .withMessage("Rating must be a Number")
  .isInt({min:1, max:5})
  .withMessage("Rating must be a number between 1 and 5")
  .notEmpty()
  .withMessage("Name cannot be empty"),
  checkValidations,
];

const createMealsValidators = [
  body("name")
  .isString()
  .withMessage("Name must be a string")
  .notEmpty()
  .withMessage("Name cannot be empty")
  .isLength({ min: 3 })
  .withMessage("Name must be at least 3 characters"),
  body("price")
  .isNumeric()
  .withMessage("Rating must be a Number")
  .notEmpty()
  .withMessage("Name cannot be empty"),
  checkValidations,
]

module.exports = {
  createUserValidators,
  createRestaurantsValidators,
  createMealsValidators,
};
