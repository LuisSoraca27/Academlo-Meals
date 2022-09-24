const { Meals } = require("../models/meals.models");
const { Restaurants } = require("../models/restaurants.models");
const { catchAsync } = require("../utils/catchAsync.utils");

const createMeals = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { name, price } = req.body;

  const meal = await Meals.create({
    name,
    price,
    restaurantId: id,
  });

  res.status(201).json({
    status: "success",
    data: { meal },
  });
});

const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meals.findAll({
    where: { status: "active" },
    include: Restaurants,
  });

  res.status(200).json({
    status: "success",
    data: { meals },
  });
});

const getMealById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meals.findOne({
    where: { id, status: "active" },
    include: Restaurants,
  });

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const updateMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  await meal.update({ name, price });

  res.status(200).json({
    status: "success",
    data: { meal },
  });
});

const deleteMeals = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: "disabled" });

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  createMeals,
  getAllMeals,
  getMealById,
  updateMeals,
  deleteMeals,
};
