
const express = require('express')
const Route = express.Router()

const borrowerController = require('../controllers/member')
const Auth = require('../helpers/auth')

Route 
  .all('/*', Auth.authInfo)
  .get('/', borrowerController.getUser)
  .post(`/`, borrowerController.insertUser)
  .patch(`/:id_ktp`, borrowerController.updateUser)
  .delete(`/:id_ktp`, borrowerController.deleteUser)

module.exports = Route
