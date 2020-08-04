const db = require('../database');

module.exports = class Model {
  static mainTableName = '';

  /**
   * We use `Object.entries` in order to preserve insertion order
   * (i.e. associating a key with its value consistently)
   * @param {object} props
   *
   * @returns {[any[], any[]]}
   */
  static getColumnsAndValuesFromProps(props) {
    const columns = [];
    const values = [];

    Object.entries(props).forEach(([key, value]) => {
      columns.push(key);
      values.push(value);
    });

    return [columns, values];
  }

  /**
   * @param {number} numberOfPlaceholders
   *
   * @returns {string} something like ?, ?, ?,...
   */
  static getPlaceholders(numberOfPlaceholders) {
    return Array.from({ length: numberOfPlaceholders }, _ => '?').join(', ');
  }

  /**
   * @param {string} sql
   * @param {?params} params
   *
   * @returns {Promise<any>}
   */
  static query(sql, params = []) {
    return db.query(sql, params);
  }
};
