const Sequelize = require('sequelize');  // npm install --save sequelize

const sequelize = new Sequelize('booking-app', 'root', 'Root@123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
