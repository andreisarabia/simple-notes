const Model = require('./Model');

module.exports = class Note extends Model {
  static mainTableName = 'notes';

  /**
   * @param {object} props
   * @param {number} props.id
   * @param {string} props.title
   * @param {string} props.description
   * @param {string} props.creation_date
   */
  constructor(props) {
    super();
    this.props = { ...props };
  }

  /**
   * @param {number} id
   *
   * @returns {Promise<Note>}
   */
  static async findById(id) {
    const sql = `
      SELECT * FROM ${this.mainTableName}
      WHERE \`id\` = ?
      LIMIT 1
    `;

    const [row] = await Model.query(sql, [id]);

    return new Note(row);
  }

  /**
   * @returns {Promise<Note[]>}
   */
  static async findAll() {
    const sql = `
      SELECT * FROM ${this.mainTableName}
      ORDER BY creation_date DESC
    `;

    const rows = await Model.query(sql);

    return rows.map(row => new Note(row));
  }

  /**
   * `id` and `creation_date` are automatically
   * generated when inserting data to the `notes` table
   * @param {object} props
   * @param {string} props.title
   * @param {string} props.description
   *
   * @returns {Promise<Note>}
   */
  static async createFrom(props) {
    const [columns, values] = Model.getColumnsAndValuesFromProps(props);
    const placeholders = Model.getPlaceholders(values.length);

    const sql = `
      INSERT INTO \`notes\`
      (${columns.join(', ')})
      VALUES (${placeholders})
    `;

    const { insertId } = await Model.query(sql, values);
    const note = await this.findById(insertId);

    return note;
  }
};
