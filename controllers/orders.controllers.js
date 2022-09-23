const { Meals } = require("../models/meals.models");
const { Orders } = require("../models/orders.models");
const { Restaurants } = require("../models/restaurants.models");



const createOrder = async (req, res) => {
  const { quantity } = req.body;
  const { meal, sessionUser } = req;
  console.log(meal);
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
};

const getOrderUser = async (req, res) => {
  const { sessionUser } = req;

  const ordersByUser = await Orders.findOne({
    where: { userId: sessionUser.id },
    include: [{model: Meals, include:{ model:Restaurants}}]
  });
  res.status(200).json({
    status: 'success',
    data: {ordersByUser}
  })
};

const updateOrder = async (req, res) => {

    const { order } = req;

    await order.update({status: 'completed'})

    res.status(200).json({
        status: 'success',
    })
}

const deleteOrder = async (req, res) => {

    const { order } = req

    await order.update({status: 'cancelled'})

    res.status(200).json({
        status: 'success',
    })
}

module.exports = {
  createOrder,
  getOrderUser,
  updateOrder,
  deleteOrder,
};
