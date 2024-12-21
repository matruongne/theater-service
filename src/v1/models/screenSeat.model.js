const { DataTypes } = require('sequelize')
const { sequelize } = require('../configs/databases/init.mysql')
const { v4: uuidv4 } = require('uuid')
const Screen = require('./screen.model')

const ScreenSeat = sequelize.define('ScreenSeat', {
	seat_id: {
		type: DataTypes.STRING(24),
		defaultValue: () => uuidv4().replace(/-/g, '').slice(0, 24),
		primaryKey: true,
	},
	screen_id: {
		type: DataTypes.STRING(24),
		allowNull: false,
		references: {
			model: Screen,
			key: 'screen_id',
		},
	},
	seat_row: {
		type: DataTypes.CHAR(1),
		allowNull: false,
		validate: {
			isAlpha: true,
			len: [1, 1],
		},
	},
	seat_number: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
		},
	},
	seat_type: {
		type: DataTypes.ENUM('NORMAL', 'VIP', 'DUPLEX', 'CHILD'),
		allowNull: false,
		defaultValue: 'NORMAL',
	},
	showtime_id: {
		type: DataTypes.STRING(24),
		allowNull: true,
	},
	status: {
		type: DataTypes.ENUM('available', 'reserved', 'occupied'),
		defaultValue: 'available',
	},
	booking_id: {
		type: DataTypes.STRING(24),
		allowNull: true,
	},
})

const updateTotalSeats = async screenId => {
	try {
		const totalSeats = await ScreenSeat.count({ where: { screen_id: screenId } })
		await Screen.update({ total_seats: totalSeats }, { where: { screen_id: screenId } })
	} catch (error) {
		console.error('Error updating total seats:', error.message)
	}
}

ScreenSeat.afterBulkCreate(async (seats, options) => {
	await updateTotalSeats(seats[0].screen_id)
})

ScreenSeat.afterDestroy(async (seat, options) => {
	await updateTotalSeats(seat.screen_id)
})

module.exports = ScreenSeat
