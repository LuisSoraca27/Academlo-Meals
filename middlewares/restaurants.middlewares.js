const { Restaurants } = require("../models/restaurants.models");
const { Reviews } = require("../models/reviews.models");

const restaurantExist = async (req, res, next) => {

  const { id } = req.params;

  const restaurant = await Restaurants.findOne({ where: { id } });

  if (!restaurant) {
    res.status(404).json({
        status: 'error',
        message: 'Restaurant does not exist'
    })
  }
  req.restaurant = restaurant;
  next();
};

const reviewExist = async (req, res, next) => {

  const { id } = req.params;

  const review = await Reviews.findOne({ where: { id } });

  if (!review) {
    res.status(404).json({
        status: 'error',
        message: 'Restaurant does not exist'
    })
  }
  req.review = review;
  next();
};


module.exports = {
    restaurantExist,
    reviewExist,
}