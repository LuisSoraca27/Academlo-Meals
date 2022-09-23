const { Meals } = require('../models/meals.models')

const mealExist = async (req, res, next) => {

    const { id } = req.params;
  
    const meal = await Meals.findOne({ where: { id } });
  
    if (!meal) {
      res.status(404).json({
          status: 'error',
          message: 'Meal does not exist'
      })
    }
    req.meal = meal;
    next();
  };


  module.exports = {
    mealExist,
  }