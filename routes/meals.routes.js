const express = require("express");

// controllers
const {
  createMeals,
  getAllMeals,
  getMealById,
  updateMeals,
  deleteMeals,
} = require("../controllers/meals.controllers");

//middlewares
const { mealExist } = require("../middlewares/meals.middlewares");

const { protectSession, protectAdmin } = require("../middlewares/auth.middlewares");


// validators
const { createMealsValidators } = require('../middlewares/validators.middlewares')



const mealsRouter = express.Router();

mealsRouter.get("/", getAllMeals);

mealsRouter.get("/:id", getMealById);

mealsRouter.use(protectSession);

mealsRouter.post("/:id", createMealsValidators, createMeals);

mealsRouter.patch("/:id", mealExist, protectAdmin, updateMeals);

mealsRouter.delete("/:id", mealExist, protectAdmin, deleteMeals);

module.exports = {
  mealsRouter,
};
