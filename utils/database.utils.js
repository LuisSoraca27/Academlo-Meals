const {Sequelize, DataTypes} = require('sequelize');

const db = new Sequelize({
    dialect: "postgres",
    host: "localHost",
    port: 5432,
    username: "postgres",
    password: "pass1234",
    database: "academloMeals",
    logging: false
  });


 
 
 
 
  module.exports = {
    db,
    DataTypes
}