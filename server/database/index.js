const mysql = require('mysql');

const dbConfiguration = require('./config.json');

const connection = mysql.createConnection(dbConfiguration);

module.exports = class Database {
  // we wrap the `mysql` library's query method with a Promise
  // to be able to use async/await in other parts of the app
  static query(sql, params) {
    return new Promise((resolve, reject) => {
      connection.query(sql, params, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
};
