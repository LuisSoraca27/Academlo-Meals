const { Meals } = require('../models/meals.models');
const { Orders } = require('../models/orders.models');

const mealExist = async (req, res, next) => {

    const { mealId } = req.body;
  
    const meal = await Meals.findOne({ where: { id: mealId, status:'active' } });
  
    if (!meal) {
      res.status(404).json({
          status: 'error',
          message: 'Meal does not exist'
      })
    }
    req.meal = meal;
    next();
  };

const orderExist = async (req, res, next ) => {

    const { id } = req.params

    const order = await Orders.findOne({where: {id, status: 'active'}})

    if(!order) {
        res.status(404).json({
            status: 'success',
            data: 'Order not exist'
        })
    }
    next()
}

const protectOrdersOwner = async (req, res, next) => {

    const { sessionUser, order} = req

    if(sessionUser.id !== order.userid) {
        res.status(403).json({
            status: 'error',
			message: 'You are not the owner of this account.',
        })
    }
    next()
}

  module.exports = {
    mealExist,
    orderExist,
    protectOrdersOwner,
  }