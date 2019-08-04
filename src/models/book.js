const conn = require('../config/connect')

module.exports = {
  getBook: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT  * FROM  tb_buku LEFT JOIN tb_kategori  ON tb_buku.id_kategori = tb_kategori.id_kategori', (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  getBookactive: () => {
    const data = 'ada'
    return new Promise((resolve, reject) => {
      conn.query('SELECT  * FROM  tb_buku LEFT JOIN tb_kategori  ON tb_buku.id_kategori = tb_kategori.id_kategori WHERE tb_buku.status=?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  detailBook: (id) => {
    console.log('id', id)
    return new Promise((resolve, reject) => {
      conn.query('SELECT  * FROM  tb_buku LEFT JOIN tb_kategori  ON tb_buku.id_kategori = tb_kategori.id_kategori WHERE tb_buku.id_buku=?', id, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  insertBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT INTO tb_buku SET ?', data, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  updateBook: (id_buku, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE tb_buku SET ? WHERE id_buku=?', [data, id_buku], (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    }) 
  },
  deleteBook: (id_buku) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM tb_buku WHERE id_buku=?', id_buku, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}
