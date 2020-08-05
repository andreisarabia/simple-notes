const db = require('../database');

/**
 * Provides an interface for useful methods that
 * subclasses can utilize.
 *
 * @class Model
 */
module.exports = class Model {
  static mainTableName = '';

  /**
   * Child classes define a props object representing a row
   * (key-value pairs corresponding to column-value).
   * This getter returns a shallow copy of that object.
   */
  get data() {
    return { ...this.props };
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
   * @returns {Promise<any | any[]>}
   */
  static query(sql, params = []) {
    return db.query(sql, params);
  }
};
