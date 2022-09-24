const { Restaurants } = require("../models/restaurants.models");
const { Reviews } = require("../models/reviews.models");
const { catchAsync } = require('../utils/catchAsync.utils')
const { AppError } = require('../utils/AppError.utils')

const restaurantExist = catchAsync(async (req, res, next) => {

  const { id } = req.params;

  const restaurant = await Restaurants.findOne({ where: { id } });

  if (!restaurant) {
    return next(new AppError('Restaurant does not exist', 404))
  }

  req.restaurant = restaurant;
  next();
})

const reviewExist = catchAsync(async (req, res, next) => {

  const { id } = req.params;

  const review = await Reviews.findOne({ where: { id } });

  if (!review) {
    return next(new AppError('Restaurant does not exist', 404))
  }
  req.review = review;
  next();
})


module.exports = {
    restaurantExist,
    reviewExist,
}