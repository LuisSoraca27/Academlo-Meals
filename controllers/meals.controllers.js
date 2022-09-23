const { Meals } = require("../models/meals.models");
const { Restaurants } = require("../models/restaurants.models")

const createMeals = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

const getAllMeals = async (req, res) => {
  try {
    const meals = await Meals.findAll({ 
        where: { status: "active" },
        include: Restaurants,
});

    res.status(200).json({
      status: "success",
      data: { meals },
    });
  } catch (error) {
    console.log(error);
  }
};

const getMealById = async (req, res) => {
  try {
    const { id } = req.params;

    const meal = await Meals.findOne({
      where: { id, status: "active" },
    });

    res.status(200).json({
      status: "success",
      data: { meal },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateMeals = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { meal } = req;

    await meal.update({ name, price });

    res.status(200).json({
      status: "success",
      data: { meal },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteMeals = async (req, res) => {
    try {
      const { meal } = req;
  
      await meal.update({ status: "disabled" });
  
      res.status(204).json({
        status: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

module.exports = {
  createMeals,
  getAllMeals,
  getMealById,
  updateMeals,
  deleteMeals,
};
