const conn = require('../config/connect')
const isEmpty = require('lodash.isempty')

module.exports = {
  getDonate: () => {
    // if (type === 'search') {
      return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM tb_donasi', (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
      })
  }, 
  insertDonate: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_donasi SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateDonate: (id_donasi, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_donasi SET ? WHERE id_donasi=?', [data, id_donasi], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
  deleteDonate: (id_kategori) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM tb_donasi WHERE id_donasi=?', id_kategori, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  confirDonate: (id_donasi, data) => {
    let confirdonasi = 1
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_donasi SET confir_donasi = ? WHERE id_donasi=?', confirdonasi, id_donasi, (err, result) => {
        conn.query('INSERT INTO tb_buku SET ?', data, (err, result) => {
          if (!err) {
            resolve(result)
          } else {
            reject(new Error(err))
          }
        })
        
      })
    })
  }
}
