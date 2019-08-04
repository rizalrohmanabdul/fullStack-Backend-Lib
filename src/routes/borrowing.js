const express = require('express')
const Route = express.Router()

const borrowingController = require('../controllers/borrowing')
const Auth = require('../helpers/auth')
Route
  .all('/*', Auth.authInfo)
  .get('/', Auth.accesstoken, borrowingController.getBorrowing)
  .get('/details/:id', borrowingController.detailBorrowing)
  .get('/getbyiduser/:id', borrowingController.getBorrowingByidUser)
  .post(`/`, borrowingController.insertBorrowing)
  .patch(`/:id_borrowing`, borrowingController.updateBorrowing)
  .patch(`/retruned/:id_borrowing`, borrowingController.retrunedBorrowing)
  .delete(`/:id_borrowing`, borrowingController.deleteBorrowing)

module.exports = Route
