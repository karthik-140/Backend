const Sequelize = require('sequelize');

const sequelize = new Sequelize('database-management-project', 'root', 'Root@123', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;
