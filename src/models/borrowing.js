const conn = require("../config/connect");

module.exports = {
  getBorrowing: () => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM tb_peminjaman INNER JOIN tb_buku ON tb_peminjaman.id_buku = tb_buku.id_buku INNER JOIN tb_kategori ON tb_buku.id_kategori = tb_kategori.id_kategori INNER JOIN tb_user ON tb_peminjaman.id_ktp = tb_user.id_ktp",
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  detailBorrowing: id => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM tb_peminjaman INNER JOIN tb_buku ON tb_peminjaman.id_buku = tb_buku.id_buku INNER JOIN tb_kategori ON tb_buku.id_kategori = tb_kategori.id_kategori INNER JOIN tb_user ON tb_peminjaman.id_ktp = tb_user.id_ktp WHERE tb_peminjaman.id_peminjaman =?",
        id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  insertBorrowing: data => {
    console.log(data);
    const data2 = "dipinjam";
    const id_buku = data.id_buku;
    return new Promise((resolve, reject) => {
      conn.query("INSERT INTO tb_peminjaman SET ?", data, (_err, _result) => {
        conn.query(
          "UPDATE tb_buku SET status= ? WHERE id_buku=?",
          [data2, id_buku],
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              reject(new Error(err));
            }
          }
        );
      });
    });
  },
  updateBorrowing: (id_ktp, data) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE tb_peminjaman SET ? WHERE id_ktp=?",
        [data, id_ktp],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  retrunedBorrowing: (_id_peminjaman, data) => {
    console.log(data);
    const data2 = "ada";
    const id_buku = data.id_buku;
    return new Promise((resolve, reject) => {
      conn.query(
        "UPDATE tb_peminjaman SET ? WHERE id_peminjaman=?",
        [data, _id_peminjaman],
        (err, result) => {
          conn.query(
            "UPDATE tb_buku SET status= ? WHERE id_buku=?",
            [data2, id_buku],
            (err, result) => {
              if (!err) {
                resolve(result);
              } else {
                reject(new Error(err));
              }
            }
          );
        }
      );
    });
  },
  getBorrowingByidUser: (id) => {
    return new Promise((resolve, reject) => {
      conn.query(
        "SELECT * FROM tb_peminjaman INNER JOIN tb_buku ON tb_peminjaman.id_buku = tb_buku.id_buku INNER JOIN tb_kategori ON tb_buku.id_kategori = tb_kategori.id_kategori INNER JOIN tb_user ON tb_peminjaman.id_ktp = tb_user.id_ktp WHERE tb_peminjaman.id_ktp =?",id,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deleteBorrowing: id_ktp => {
    return new Promise((resolve, reject) => {
      conn.query(
        "DELETE FROM tb_peminjaman WHERE id_ktp=?",
        id_ktp,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  }
};
