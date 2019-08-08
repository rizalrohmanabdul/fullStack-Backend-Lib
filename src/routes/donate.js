const express = require('express')
const Route = express.Router()

const donateController = require('../controllers/donate')
const Auth = require('../helpers/auth')

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname);
  }
});

let upload = multer({ storage: storage }); 
Route
  .all('/*', Auth.authInfo)
  .get('/', donateController.getDonate)
  .post(`/`, upload.single('gbr_buku_donasi'), donateController.insertDonate)
  .patch(`/:id_donasi`, upload.single('gbr_buku_donasi'), donateController.updateDonate)
  .patch(`/confir/:id_donasi`, donateController.updateDonate)
  .delete(`/:id_donasi`, donateController.deleteDonasi)

module.exports = Route