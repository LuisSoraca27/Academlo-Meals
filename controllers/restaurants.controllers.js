const { Restaurants } = require("../models/restaurants.models");
const { Reviews } = require("../models/reviews.models");

const getAllRestautants = async (req, res) => {
  try {
    const restaurants = await Restaurants.findAll({
      where: { status: "active" },
    });

    res.status(200).json({
      status: "success",
      data: { restaurants },
    });
  } catch (error) {
    console.log(error);
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurants = await Restaurants.findOne({
      where: { id, status: "active" },
    });

    res.status(200).json({
      status: "success",
      data: { restaurants },
    });
  } catch (error) {
    console.log(error);
  }
};

const createRestaurants = async (req, res) => {
  try {
    const { name, address, rating } = req.body;

    const restaurant = await Restaurants.create({ name, address, rating });

    res.status(200).json({
      status: "success",
      data: { restaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurants = async (req, res) => {
  try {
    const { name, address } = req.body;
    const { restaurant } = req;

    await restaurant.update({ name, address });

    res.status(200).json({
      status: "success",
      data: { restaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurants = async (req, res) => {
  try {
    const { restaurant } = req;

    await restaurant.update({ status: " delete" });

    res.status(200).json({
      status: "success",
      data: { restaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (req, res) => {
  try {
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
        status: 'success',
        data: {review}
    })

  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (req, res) => {

    try {
        const { comment, rating } = req.body;
        const { review } = req;

        await review.update({comment, rating})

        res.status(200).json({
            status: 'success',
            data: {review}
        })

    } catch (error) {
        console.log(error)
    }
}

const deleteReview = async (req, res) => {
  
    try {
        const { review } = req;

        await review.update({ status: 'disabled'})
    
        res.status(200).json({
            status: 'success'
        })
    } catch (error) {
        console.log(error)
    }
}

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
