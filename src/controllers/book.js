const bookModel = require("../models/book.js");
const help = require("../helpers/helpers");
const cloudinary = require("cloudinary");

module.exports = {
  getBook: (req, res) => {
    let limit = parseInt(req.query.limit) || 8;
    let page = parseInt(req.query.page) || 1;
    bookModel
      .getBook(limit, page)
      .then(resultBook => {
        const result = resultBook;
        help.response(res, result, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
  searchBook: (req, res) => {
    let search = req.query.search
    let limit = parseInt(req.query.limit) || 8;
    let page = parseInt(req.query.page) || 1;
    bookModel
      .searchBook(search, limit, page)
      .then(resultBook => {
        const result = resultBook;
        help.response(res, result, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
  getBookactive: (req, res) => {
    bookModel
      .getBookactive()
      .then(resultBook => {
        const result = resultBook;
        help.response(res, result, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
  detailBook: (req, res) => {
    const id = req.params.id_book;
    bookModel
      .detailBook(id)
      .then(resultBook => {
        const result = resultBook;
        help.response(res, result, 200);
      })
      .catch(error => {
        console.log(error);
      });
  },
  insertBook: async (req, res) => {
    const path = req.file.path;
    const getUrl = async req => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

      let dataimg;
      await cloudinary.uploader.upload(path, result => {
        console.log("coba ini", path);
        // const fs = require('fs')
        // fs.unlink(path)
        dataimg = result.url;
      });
      return dataimg;
    };
    console.log("coba", await getUrl());

    const data = {
      id_kategori: req.body.id_kategori,
      nama_buku: req.body.nama_buku,
      pengarang: req.body.pengarang,
      gbr: await getUrl(),
      status: "ada"
    };

    bookModel
      .insertBook(data)
      .then(resultBook => {
        const result = resultBook;
        help.response(res, result, 200, data);
      })
      .catch(error => {
        console.log(error);
      });
  },

  updateBook: async (req, res) => {
    const path = req.file.path;
    const getUrl = async req => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      });

      let dataimg;
      await cloudinary.uploader.upload(path, result => {
        console.log("coba ini", path);
        // const fs = require('fs')
        // fs.unlink(path)
        dataimg = result.url;
      });
      return dataimg;
    };
    const id_buku = req.params.id_book;
    const data = {
      id_kategori: req.body.id_kategori,
      nama_buku: req.body.nama_buku,
      pengarang: req.body.pengarang,
      gbr: await getUrl()
    };
    bookModel
      .updateBook(id_buku, data)
      .then(resultBook => {
        const result = resultBook;
        help.response(res, result, 200, [id_buku, data]);
      })
      .catch(error => {
        console.log(error);
      });
  },
  deleteBook: (req, res) => {
    const id_buku = req.params.id_book;
    bookModel
      .deleteBook(id_buku)
      .then(resultBook => {
        const result = resultBook;
        help.response(res, result, 200, id_buku);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
function newFunction(getUrl) {
  return getUrl();
}
