const donateModel = require('../models/donate')
const help = require('../helpers/helpers')
const isEmpty = require('lodash.isempty')
const cloudinary = require('cloudinary')

module.exports = {
  getDonate: (req, res) => {
    donateModel
      .getDonate()
      .then(resultDonate => {
        help.response(res, resultDonate, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  insertDonate: async (req, res) => {
    const path = req.file.path
    console.log('ini past', path)
    const getUrl = async req => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      })

      let dataimg
      await cloudinary.uploader.upload(path, result => {
        console.log('coba ini', path)
        // const fs = require('fs')
        // fs.unlink(path)
        dataimg = result.url
      })
      return dataimg
    }
    const data = {
      id_kategori: req.body.id_kategori,
      nama_buku_donasi: req.body.nama_buku_donasi,
      pengarang_buku_donasi: req.body.pengarang_buku_donasi,
      gbr_buku_donasi: await getUrl(),
      no_ktp: req.body.no_ktp,
      nama_donasi: req.body.nama_donasi,
      alamat_donasi: req.body.alamat_donasi,
      confir_donasi: 0,
      created_at: new Date()
    }

    donateModel
      .insertDonate(data)
      .then(resultDonate => {
        const result = resultDonate
        help.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },

  updateDonate: async (req, res) => {
    const path = req.file.path
    const getUrl = async req => {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
      })

      let dataimg
      await cloudinary.uploader.upload(path, result => {
        console.log('coba ini', path)
        // const fs = require('fs')
        // fs.unlink(path)
        dataimg = result.url
      })
      return dataimg
    }
    const id_donate = req.params.id_donate
    const data = {
      id_kategori: req.body.id_kategori,
      nama_buku_donasi: req.body.nama_buku_donasi,
      pengarang_buku_donasi: req.body.pengarang_buku_donasi,
      gbr_buku_donasi: await getUrl(),
      no_ktp: req.body.no_ktp,
      nama_donasi: req.body.nama_donasi,
      alamat_donasi: req.body.alamat_donasi,
      confir_donasi: req.body.confir_donasi,
    }
    donateModel
      .updateDonate(id_donate, data)
      .then(resultCategory => {
        const result = resultCategory
        help.response(res, result, 200, [id_donate, data])
      })
      .catch(error => {
        console.log(error)
      })
  },
  deleteDonasi: (req, res) => {
    const id_donasi = req.params.id_donasi

    donateModel
      .deleteDonasi(id_donasi)
      .then(resultCategory => {
        const result = resultCategory
        help.response(res, result, 200, id_donasi)
      })
      .catch(error => {
        console.log(error)
      })
  },
  confirDonasi: (req, res) => {
    const id_donasi = req.params.id_donasi
    const data = {
      id_kategori: req.body.id_kategori,
      nama_buku: req.body.nama_buku,
      pengarang: req.body.pengarang,
      gbr: req.body.pengarang,
      status: 'ada'
    }
    donateModel
      .confirDonasi(id_donasi, data)
      .then(resultCategory => {
        const result = resultCategory
        help.response(res, result, 200, id_donasi)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
