const Screen = require('./screen.model')
const Address = require('./address.model')
const ScreenSeat = require('./screenSeat.model')
const Theater = require('./theater.model')
const TheaterAddress = require('./theaterAddresses.model')

Theater.belongsToMany(Address, { through: TheaterAddress, foreignKey: 'theater_id' })
Address.belongsToMany(Theater, { through: TheaterAddress, foreignKey: 'address_id' })

Theater.hasMany(Screen, { foreignKey: 'theater_id', onDelete: 'CASCADE' })
Screen.belongsTo(Theater, { foreignKey: 'theater_id' })

Screen.hasMany(ScreenSeat, { foreignKey: 'screen_id', onDelete: 'CASCADE' })
ScreenSeat.belongsTo(Screen, { foreignKey: 'screen_id' })

module.exports = {
	Screen,
	Address,
	ScreenSeat,
	Theater,
	TheaterAddress,
}
