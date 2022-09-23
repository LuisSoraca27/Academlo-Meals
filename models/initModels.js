const { User } = require("../models/users.models");
const { Reviews } = require("../models/reviews.models");
const { Restaurants } = require("../models/restaurants.models");
const { Orders } = require("../models/orders.models");
const { Meals } = require("../models/meals.models");

const initModels = () => {
  // Users 1 <---> M Orders
  User.hasMany(Orders, { foreignKey: "userId" });
  Orders.belongsTo(User);

  // Users 1 <----> M Reviews
  User.hasMany(Reviews, { foreignKey: "userId" });
  Reviews.belongsTo(User);

  // Restaurants 1 <----> M Reviews
  Restaurants.hasMany(Reviews, { foreignKey: "restaurantId" });
  Reviews.belongsTo(Restaurants);

  // Restaurants 1 <----> M Meals
  Restaurants.hasMany(Meals, { foreignKey: "restaurantId" });
  Meals.belongsTo(Restaurants);

  // Meals 1 <-----> 1 Orders
  Meals.hasOne(Orders, { foreignKey: "mealId" });
  Orders.belongsTo(Meals);
};

module.exports = {
  initModels,
};
