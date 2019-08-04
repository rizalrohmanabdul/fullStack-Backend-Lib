const express = require("express");
const Route = express.Router();

const bookController = require("../controllers/book");
const Auth = require("../helpers/auth");

// image
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

Route.get("/", bookController.getBook)
  .get("/active/", bookController.getBookactive)
  .get('/detail/:id_book', bookController.detailBook)
  .post(`/`, upload.single('gbr'), bookController.insertBook)
  .patch(`/:id_book`, upload.single('gbr'), bookController.updateBook)
  .delete(`/:id_book`, bookController.deleteBook);

module.exports = Route;
