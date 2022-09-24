// models
const { User } = require("../models/users.models");
const { Orders } = require("../models/orders.models");
const { Meals } = require("../models/meals.models");
const { Restaurants } = require("../models/restaurants.models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { catchAsync } = require("../utils/catchAsync.utils");
const { AppError } = require("../utils/AppError.utils");

const getAllOrdersUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Orders.findAll({
    where: { userId: sessionUser.id },
    include: [{ model: Meals, include: [{ model: Restaurants }] }],
  });

  if (!orders) {
   return next(new AppError("this user has no orders", 404));
  }

  res.status(200).json({
    status: "success",
    data: { orders },
  });
});

const getOrderbyid = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const order = await Orders.findOne({
    where: { userId: sessionUser.id, id },
    include: [{ model: Meals, include: [{ model: Restaurants }] }],
  });

  if (!order) {
    return next(new AppError("this user has no orders", 404));
  }

  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role !== "admin" && role !== "normal") {
    return next(new AppError("role not valid", 400));
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {

  const { user } = req;

  await user.update({ status: "disabled" });

  res.status(204).json({ status: "success" });

})

const login = catchAsync(async (req, res, next) => {
  
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Wrong credentials", 400))
  }

  //remove password user
  user.password = undefined;

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "5h" });

  res.status(200).json({
    status: "success",
    data: { user, token },
  });
})

module.exports = {
  createUser,
  updateUser,
  login,
  deleteUser,
  getAllOrdersUser,
  getOrderbyid,
};
