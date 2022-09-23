// models
const { User } = require("../models/users.models");
const { Orders } = require("../models/orders.models");
const { Meals } = require("../models/meals.models");
const { Restaurants } = require("../models/restaurants.models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getAllOrdersUser = async (req, res) => {
  const { user, sessionUser } = req;

  const orders = await Orders.findAll({
    where: { userId: sessionUser.id },
    include: [{ model: Meals, include: [{ model: Restaurants }] }],
  });

  if (!orders) {
    res.status(404).json({
      status: "error",
      message: "this user has no orders",
    });
  }

  res.status(200).json({
    status: "success",
    data: { orders },
  });
};

const getOrderbyid = async (req, res) => {
  try {
    const { sessionUser } = req;
    const { id } = req.params;

    const order = await Orders.findOne({
      where: { userId: sessionUser.id, id },
      include: [{ model: Meals, include: [{ model: Restaurants }] }],
    });

    if (!order) {
      res.status(404).json({
        status: "error",
        message: "this user has no orders",
      });
    }

    res.status(200).json({
      status: "success",
      data: { order },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if(role !== 'admin' && role !== 'normal') {
      res.status(400).json({
        status:'error',
        message: 'role not valid'
      })
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
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  user.password = undefined;

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

const deleteUser = async (req, res, next) => {
  try {
    const { user } = req;

    await user.update({ status: "disabled" });

    res.status(204).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, status: "active" } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).json({
        status: "error",
        message: "Wrong credentials",
      });
    }

    //remove password user
    user.password = undefined;

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "5h" });

    res.status(200).json({
      status: "success",
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  updateUser,
  login,
  deleteUser,
  getAllOrdersUser,
  getOrderbyid,
};
