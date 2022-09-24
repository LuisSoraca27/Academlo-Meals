const { Meals } = require('../models/meals.models');
const { Orders } = require('../models/orders.models');
const { catchAsync } = require('../utils/catchAsync.utils')
const { AppError } = require('../utils/AppError.utils')

const mealExist = catchAsync(async (req, res, next) => {

    const { mealId } = req.body;
  
    const meal = await Meals.findOne({ where: { id: mealId, status:'active' } });
  
    if (!meal) {
    return next(new AppError('Meal does not exist'), 404)
    }
    req.meal = meal;
    next();
  })

const orderExist = catchAsync( async (req, res, next ) => {

    const { id } = req.params

    const order = await Orders.findOne({where: {id, status: 'active'}})

    if(!order) {
        return(new AppError('Order not exist', 404))
    }
    next()
})

const protectOrdersOwner = catchAsync( async (req, res, next) => {

    const { sessionUser, order} = req

    if(sessionUser.id !== order.userid) {
        return next(new AppError('You are not the owner of this account.', 403))
    }
    next()
})

  module.exports = {
    mealExist,
    orderExist,
    protectOrdersOwner,
  }