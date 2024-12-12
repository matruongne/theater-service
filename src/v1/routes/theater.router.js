const express = require('express')
const theatersRouter = express.Router()
const theaterController = require('../controllers/theater.controller')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

theatersRouter.get('/', theaterController.getTheaters)
theatersRouter.get('/:theaterId', theaterController.getTheaterById)

theatersRouter.use(isAuth)
theatersRouter.use(isAdmin)

theatersRouter.post('/new', theaterController.createTheater)
theatersRouter.patch('/:theaterId', theaterController.updateTheater)
theatersRouter.patch('/address/:theaterId', theaterController.updateTheaterAddress)
theatersRouter.delete('/:theaterId', theaterController.deleteTheater)

module.exports = theatersRouter
