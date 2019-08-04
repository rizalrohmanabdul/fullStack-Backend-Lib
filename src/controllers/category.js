const categoryModel = require('../models/category')
const help = require('../helpers/helpers')
const isEmpty = require('lodash.isempty')

module.exports = {
  getCategory: (req, res) => {
    // const search = req.query.search
    // if (!isEmpty(search)) {
    //   const searchCategory = search
    //   var getdata = searchCategory
    //   var typeget = 'search'
    // } else {
    //   var getdata = ''
    //   var typeget = ''
    // }
    categoryModel
      .getCategory()
      .then(resultCategory => {
        help.response(res, resultCategory, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  insertCategory: (req, res) => {
    const data = {
      nama_kategori: req.body.nama_kategori,
      nama_rak: req.body.nama_rak
    }

    categoryModel
      .insertCategory(data)
      .then(resultCategory => {
        const result = resultCategory
        help.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  updateCategory: (req, res) => {
    const id_kategori = req.params.id_category
    const data = {
      nama_kategori: req.body.nama_kategori,
      nama_rak: req.body.nama_rak
    }
    categoryModel
      .updateCategory(id_kategori, data)
      .then(resultCategory => {
        const result = resultCategory
        help.response(res, result, 200, [id_kategori, data])
      })
      .catch(error => {
        console.log(error)
      })
  },
  deleteCategory: (req, res) => {
    const id_kategori = req.params.id_category

    categoryModel
      .deleteCategory(id_kategori)
      .then(resultCategory => {
        const result = resultCategory
        help.response(res, result, 200, id_kategori)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
