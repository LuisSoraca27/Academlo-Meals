const express = require("express");

//controllers
const {
  createOrder,
  getOrderUser,
  deleteOrder,
  updateOrder,
} = require("../controllers/orders.controllers");

//middlewares
const {
  mealExist,
  orderExist,
  protectOrdersOwner,
} = require("../middlewares/orders.middlewares");

const { protectSession } = require("../middlewares/auth.middlewares");

const ordersRouter = express.Router();

ordersRouter.use(protectSession);

ordersRouter.post("/", mealExist, createOrder);

ordersRouter.get("/", getOrderUser);

ordersRouter.patch("/:id", orderExist, protectOrdersOwner, updateOrder);

ordersRouter.delete("/:id", orderExist, protectOrdersOwner, deleteOrder);

module.exports = {
  ordersRouter,
};
