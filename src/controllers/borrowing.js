const borrowingModel = require('../models/borrowing')
const help = require('../helpers/helpers')

module.exports = {
  getBorrowing: (req, res) => {
    borrowingModel.getBorrowing()
      .then((resultBorrowing) => {
        help.response(res, resultBorrowing, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  detailBorrowing: (req, res) => {
    const id = req.params.id
    borrowingModel.detailBorrowing(id)
      .then((resultBorrowing) => {
        help.response(res, resultBorrowing, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  getBorrowingByidUser: (req, res) => {
    const id = req.params.id
    borrowingModel.getBorrowingByidUser(id)
      .then((resultBorrowing) => {
        help.response(res, resultBorrowing, 200)
      })
      .catch((error) => {
        console.log(error)
      })
  },
  insertBorrowing: (req, res) => {
    const lama_pinjam = req.body.lama_pinjam
    const kadaluarsa = new Date(new Date().getTime()+(lama_pinjam*24*60*60*1000)); // 1000 ini buat pengkalian milisecondnya date object
    const data = {
      id_buku: req.body.id_buku,
      id_ktp: req.body.id_ktp,
      tgl_pinjam: new Date(),
      lama_pinjam: lama_pinjam,
      tgl_kadaluarsa: kadaluarsa,
      tgl_kembali: '',
      denda: ''
    }

    borrowingModel.insertBorrowing(data)
      .then((resultBorrowing) => {
        const result = resultBorrowing
        help.response(res, result, 200, data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  retrunedBorrowing: (req, res) => {
    const id_peminjaman = req.params.id_borrowing
    const data = {
      id_buku: req.body.id_buku,
      tgl_kembali: new Date(),
      denda: req.body.denda
    }

    borrowingModel.retrunedBorrowing(id_peminjaman, data)
      .then((resultBorrowing) => {
        const result = resultBorrowing
        help.response(res, result, 200, data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  updateBorrowing: (req, res) => {
    const id_ktp = req.params.id_borrowing
    const data = {
      id_ktp: req.body.id_borrowing,
      nama_peminjam: req.body.nama_peminjam,
      alamat: req.body.alamat
    }
    borrowingModel.updateBorrowing(id_ktp, data)
      .then((resultBorrowing) => {
        const result = resultBorrowing
        help.response(res, result, 200, [id_ktp, data])
      })
      .catch((error) => {
        console.log(error)
      })
  },
  deleteBorrowing: (req, res) => {
    const id_ktp = req.params.id_borrowing

    borrowingModel.deleteBorrowing(id_ktp)
      .then((resultBorrowing) => {
        const result = resultBorrowing
        help.response(res, result, 200, id_ktp)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
