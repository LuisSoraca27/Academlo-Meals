const express = require("express");

//controllers
const {
  createRestaurants,
  getAllRestautants,
  getRestaurantById,
  updateRestaurants,
  deleteRestaurants,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/restaurants.controllers");

// middlewares
const { restaurantExist, reviewExist } = require("../middlewares/restaurants.middlewares");

const { protectSession, protectReviewOwner, protectAdmin } = require("../middlewares/auth.middlewares");

//validators
const {
  createRestaurantsValidators,
} = require("../middlewares/validators.middlewares");

const restaurantsRouter = express.Router();

//routes
restaurantsRouter.get("/", getAllRestautants);

restaurantsRouter.get("/:id", getRestaurantById);

restaurantsRouter.use(protectSession);
 
restaurantsRouter.post("/", createRestaurantsValidators, createRestaurants);

restaurantsRouter.patch("/:id", restaurantExist, protectAdmin,updateRestaurants);

restaurantsRouter.delete("/:id", restaurantExist, protectAdmin,deleteRestaurants);

restaurantsRouter.post("/reviews/:restaurantId", createReview);

restaurantsRouter.patch("/reviews/:id", reviewExist, protectReviewOwner,updateReview);

restaurantsRouter.delete("/reviews/:id", reviewExist, protectReviewOwner,deleteReview)

module.exports = {
  restaurantsRouter,
};
