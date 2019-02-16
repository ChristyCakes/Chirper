// set up for local mysql db

import mysql from 'mysql'

// let pool = mysql.createPool({
//     connectionLimit: 10,
//     password: 'chirperapp',
//     user: 'chirperapp',
//     database: 'chirperapp',
//     host: 'localhost',
//     port: '3306'
// });

let chirprdb = {};

chirprdb.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM chirps', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

chirprdb.one = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM chirps WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        })
    })
}

chirprdb.del = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM chirps WHERE id = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results)
        })
    })
}

chirprdb.put = (id, text) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE chirps SET text= ? WHERE id = ?', [text, id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results)
        })
    })
}

chirprdb.post = (user, text) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'INSERT INTO chirps(name, text) VALUES (?, ?)', [user, text], (err, results) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(results)
                }
            })
    })
}

export default chirprdb;