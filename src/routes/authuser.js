
const express = require('express')
const Route = express.Router()

const userController = require('../controllers/member')
 
Route
  .post(`/register`, userController.registrasiUser)
  .post(`/login`, userController.loginUser)

module.exports = Route