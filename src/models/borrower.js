const conn = require('../config/connect')

module.exports = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_user', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err)) 
        }
      })
    })
  },
  registrasiUser: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_user SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  postUser: (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_user SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getByEmail: (email) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM tb_user WHERE email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateUser: (id_ktp, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_user SET ? WHERE id_ktp=?', [data, id_ktp], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
  deleteUser: (id_ktp) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM tb_user WHERE id_ktp=?', id_ktp, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}