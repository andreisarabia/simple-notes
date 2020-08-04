const Model = require('./Model');

module.exports = class Note extends Model {
  static mainTableName = 'notes';
  static tagsTableName = 'tags';
  static notesToTagsTableName = 'notes_to_tags';

  /**
   * @param {object} props
   * @param {number} props.id
   * @param {string} props.title
   * @param {string} props.description
   * @param {string} props.creation_time
   * @param {string[]} props.tags
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
      WHERE id = ?
    `;

    const [[row], tags] = await Promise.all([
      Model.query(sql, [id]),
      this.findNoteTags(id),
    ]);

    return new Note({ ...row, tags });
  }

  /**
   * @returns {Promise<Note[]>}
   */
  static async findAll() {
    const sql = `
      SELECT * FROM ${this.mainTableName}
      ORDER BY creation_time DESC
    `;

    const rows = await Model.query(sql);
    const allTags = await this.findAllNoteTags(rows.map(row => row.id));

    return rows.map(row => {
      const tags = allTags.flatMap(tag =>
        tag.note_id === row.id ? tag.name : []
      );

      return new Note({ ...row, tags });
    });
  }

  /**
   * @param {number} noteId
   *
   * @returns {string[]}
   */
  static async findNoteTags(noteId) {
    const notesToTagsSql = `
      SELECT t.name FROM ${this.notesToTagsTableName} AS ntt
      INNER JOIN tags AS t ON ntt.tag_id = t.id
      WHERE ntt.note_id = ?
    `;

    const rows = await Model.query(notesToTagsSql, [noteId]);

    return rows.map(row => row.name);
  }

  /**
   * @param {number[]} noteIds
   *
   * @returns {Promise<{note_id: string; name: string}[]}>
   */
  static async findAllNoteTags(noteIds) {
    const placeholders = Model.getPlaceholders(noteIds.length);

    const notesToTagsSql = `
      SELECT ntt.note_id, t.name FROM ${this.notesToTagsTableName} AS ntt
      INNER JOIN tags AS t ON ntt.tag_id = t.id
      WHERE ntt.note_id IN (${placeholders})
    `;

    const rows = await Model.query(notesToTagsSql, noteIds);

    return rows;
  }

  /**
   * `id` and `creation_time` are automatically
   * generated when inserting data to the `notes` table
   * @param {object} props
   * @param {string} props.title
   * @param {string} props.description
   * @param {string[]} props.tags
   *
   * @returns {Promise<Note>}
   */
  static async createFrom(props) {
    const { tags, ...restOfProps } = props;
    const [columns, values] = Model.getColumnsAndValuesFrom(restOfProps);
    const placeholders = Model.getPlaceholders(values.length);

    const noteSql = `
      INSERT INTO \`notes\` (${columns.join(', ')})
      VALUES (${placeholders})
    `;

    const { insertId } = await Model.query(noteSql, values);

    const note = await this.findById(insertId);

    return note;
  }
};
