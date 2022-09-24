const { Restaurants } = require("../models/restaurants.models");
const { Reviews } = require("../models/reviews.models");
const { catchAsync } = require("../utils/catchAsync.utils");

const getAllRestautants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurants.findAll({
    where: { status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { restaurants },
  });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurants = await Restaurants.findOne({
    where: { id, status: "active" },
  });

  res.status(200).json({
    status: "success",
    data: { restaurants },
  });
});

const createRestaurants = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurants.create({ name, address, rating });

  res.status(200).json({
    status: "success",
    data: { restaurant },
  });
});

const updateRestaurants = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: "success",
    data: { restaurant },
  });
});

const deleteRestaurants = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: " delete" });

  res.status(200).json({
    status: "success",
    data: { restaurant },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { sessionUser } = req;
  const { restaurantId } = req.params;

  const review = await Reviews.create({
    comment,
    rating,
    userId: sessionUser.id,
    restaurantId,
  });

  res.status(201).json({
    status: "success",
    data: { review },
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({ comment, rating });

  res.status(200).json({
    status: "success",
    data: { review },
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: "disabled" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  getAllRestautants,
  getRestaurantById,
  createRestaurants,
  updateRestaurants,
  deleteRestaurants,
  createReview,
  updateReview,
  deleteReview,
};
