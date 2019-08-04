const userModel = require('../models/borrower')
const help = require('../helpers/helpers')

const jwt = require('jsonwebtoken')

module.exports = {
  getUser: (req, res) => {
    userModel
      .getUser()
      .then(resultUser => {
        help.response(res, resultUser, 200)
      })
      .catch(error => {
        console.log(error)
      })
  },
  registrasiUser: (req, res) => {
    const salt = help.generateSalt(18)
    const passwordHash = help.setPassword(req.body.password, salt)
    const data = {
      id_ktp: req.body.id_ktp,
      nama_peminjam: req.body.nama_peminjam,
      jk: req.body.jk,
      alamat: req.body.alamat,
      email: req.body.email,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      token: '',
      status: 1,
      level_user: 'peminjam'
    }

    // userModel.getByEmail(data.email)
    //   .then(resultUser => {
    //     const dataUser = result[0]
    //     if (data.email === dataUser.email ) {
    //       const result = resultUser
    //       help.response(res, null, 403, 'no email duplicate')
    //     } else {
          
    //     }
    //   })
    userModel
      .registrasiUser(data)
      .then(resultUser => {
        const result = resultUser
        help.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  insertUser: (req, res) => {
    const salt = help.generateSalt(18)
    const passwordHash = help.setPassword(req.body.password, salt)
    const data = {
      id_ktp: req.body.id_ktp,
      nama_peminjam: req.body.nama_peminjam,
      jk: req.body.jk,
      alamat: req.body.alamat,
      email: req.body.email,
      password: passwordHash.passwordHash,
      salt: passwordHash.salt,
      token: '',
      status: 1,
      level_user: 'peminjam'
    }

    userModel
      .insertUser(data)
      .then(resultUser => {
        const result = resultUser
        help.response(res, result, 200, data)
      })
      .catch(error => {
        console.log(error)
      })
  },
  loginUser: (req, res) => {
    const email = req.body.email
    const password = req.body.password

    userModel
      .getByEmail(email)
      .then(result => {
        const dataUser = result[0]
        const usePassword = help.setPassword(password, dataUser.salt)
          .passwordHash
        console.log('ini dia', usePassword)

        if (usePassword === dataUser.password) {
          dataUser.token = jwt.sign(
            {
              id_ktp: dataUser.id_ktp
            },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
          )

          delete dataUser.salt
          delete dataUser.password

          return help.response(res, dataUser, 200)
        } else {
          return help.response(res, null, 403, 'Wrong email & password!')
        }
      })
      .catch(() => {
        return help.response(res, null, 403, 'No email & password!')
      })
  },
  logutUser: (req, res) => {
    // const email = req.body.email
    // const password = req.body.password
    // userModel.getByEmail(email)
    //   .then((result) => {
    //     const dataUser = result[0]
    //     const usePassword = help.setPassword(password, dataUser.salt).passwordHash
    //     console.log('ini dia', usePassword)
    //     if (usePassword === dataUser.password) {
    //       dataUser.token = jwt.sign({
    //         id_ktp: dataUser.id_ktp
    //       }, process.env.SECRET_KEY, { expiresIn: '1h' })
    //       delete dataUser.salt
    //       delete dataUser.password
    //       return help.response(res, dataUser, 200)
    //     } else {
    //       return help.response(res, null, 403, 'Wrong password!')
    //     }
    //   })
  },
  updateUser: (req, res) => {
    const id_ktp = req.params.id_ktp
    const data = {
      id_ktp: req.body.id_User,
      nama_peminjam: req.body.nama_peminjam,
      alamat: req.body.alamat
    }
    userModel
      .updateUser(id_ktp, data)
      .then(resultUser => {
        const result = resultUser
        help.response(res, result, 200, [id_ktp, data])
      })
      .catch(error => {
        console.log(error)
      })
  },
  deleteUser: (req, res) => {
    const id_ktp = req.params.id_ktp

    userModel
      .deleteUser(id_ktp)
      .then(resultUser => {
        const result = resultUser
        help.response(res, result, 200, id_ktp)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
