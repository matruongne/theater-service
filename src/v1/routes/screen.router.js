const express = require('express')
const screensRouter = express.Router()
const screenController = require('../controllers/screen.controller')
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

screensRouter.get('/', screenController.getScreens)
screensRouter.use(isAuth)
screensRouter.use(isAdmin)

screensRouter.post('/new', screenController.createScreen)
screensRouter.patch('/:screenId', screenController.updateScreen)
screensRouter.delete('/:screenId', screenController.deleteScreen)

module.exports = screensRouter
