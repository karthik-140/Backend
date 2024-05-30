const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Table = sequelize.define('table', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	}
})

module.exports = Table;
