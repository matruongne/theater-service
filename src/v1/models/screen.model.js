const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/databases/init.mysql')
const { v4: uuidv4 } = require('uuid')
const Theater = require('./theater.model')

const Screen = sequelize.define('Screen', {
	screen_id: {
		type: DataTypes.STRING(24),
		defaultValue: () => uuidv4().replace(/-/g, '').slice(0, 24),
		primaryKey: true,
	},
	theater_id: {
		type: DataTypes.STRING(24),
		allowNull: false,
		references: {
			model: Theater,
			key: 'theater_id',
		},
	},
	screen_name: { type: DataTypes.STRING(50) },
	total_seats: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	showtime_id: {
		type: DataTypes.STRING(24),
		allowNull: true,
	},
})

module.exports = Screen
