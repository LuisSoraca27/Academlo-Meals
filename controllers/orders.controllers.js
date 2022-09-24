const { Meals } = require("../models/meals.models");
const { Orders } = require("../models/orders.models");
const { Restaurants } = require("../models/restaurants.models");
const { catchAsync } = require("../utils/catchAsync.utils");

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;

  const { meal, sessionUser } = req;

  const totalPrice = meal.price * quantity;

  const order = await Orders.create({
    mealId: meal.id,
    userId: sessionUser.id,
    totalPrice,
    quantity,
  });

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const getOrderUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const ordersByUser = await Orders.findOne({
    where: { userId: sessionUser.id },
    include: [{ model: Meals, include: { model: Restaurants } }],
  });
  res.status(200).json({
    status: "success",
    data: { ordersByUser },
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "completed" });

  res.status(200).json({
    status: "success",
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: "cancelled" });

  res.status(200).json({
    status: "success",
  });
});

module.exports = {
  createOrder,
  getOrderUser,
  updateOrder,
  deleteOrder,
};
