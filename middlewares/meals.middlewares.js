const { Meals } = require('../models/meals.models')

const { AppError } = require('../utils/AppError.utils')

const mealExist = async (req, res, next) => {

    const { id } = req.params;
  
    const meal = await Meals.findOne({ where: { id } });
  
    if (!meal) {
           return next(new AppError('Meal does not exist', 403))
     }
    req.meal = meal;
    next();
  };


  module.exports = {
    mealExist,
  }