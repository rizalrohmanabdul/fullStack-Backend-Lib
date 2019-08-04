
const express = require('express')
const Route = express.Router()

const userController = require('../controllers/borrower')

Route
  .post(`/register`, userController.registrasiUser)
  .post(`/login`, userController.loginUser)

module.exports = Route