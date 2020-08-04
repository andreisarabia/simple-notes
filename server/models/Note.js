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
   * @param {{id: string; name: string}[]} props.tags
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
      ORDER BY creation_time DESC
    `;

    const [[row], tags] = await Promise.all([
      Model.query(sql, [id]),
      this.findNoteTags(id),
    ]);

    return new Note({ ...row, tags });
  }

  /**
   * @param {number} noteId
   *
   * @returns {string[]}
   */
  static async findNoteTags(noteId) {
    const notesToTagsSql = `
      SELECT t.name FROM ${this.notesToTagsTableName} AS ntt
      INNER JOIN ${this.tagsTableName} AS t ON ntt.tag_id = t.id
      WHERE ntt.note_id = ?
    `;

    const rows = await Model.query(notesToTagsSql, [noteId]);

    return rows;
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
        tag.note_id === row.id ? { id: tag.id, name: tag.name } : []
      );

      return new Note({ ...row, tags });
    });
  }

  /**
   * @param {number[]} noteIds
   *
   * @returns {Promise<{note_id: number; id: number, name: string}[]}>
   */
  static async findAllNoteTags(noteIds) {
    const placeholders = Model.getPlaceholders(noteIds.length);

    const notesToTagsSql = `
      SELECT ntt.note_id, t.name, t.id FROM ${this.notesToTagsTableName} AS ntt
      INNER JOIN ${this.tagsTableName} AS t ON ntt.tag_id = t.id
      WHERE ntt.note_id IN (${placeholders})
    `;

    const rows = await Model.query(notesToTagsSql, noteIds);

    return rows;
  }

  /**
   * @returns {Promise<{note_id: string; name: string}[]}>
   */
  static async getAllTags() {
    const allTagsSql = `
      SELECT * FROM ${this.tagsTableName}
    `;

    const rows = await Model.query(allTagsSql);

    return rows;
  }

  /**
   * @param {object} props
   * @param {string} props.title
   * @param {string} props.description
   *
   * @returns {Promise<Note>}
   */
  static async createWithoutTags({ title, description }) {
    const noteSql = `
      INSERT INTO ${this.mainTableName} (title, description)
      VALUES (?, ?)
    `;

    const { insertId } = await Model.query(noteSql, [title, description]);

    const note = await this.findById(insertId);

    return note;
  }

  /**
   * `id` and `creation_time` are automatically
   * generated when inserting data to the `notes` table
   * `tags` is an array of the tag ids the user would like
   * to associate with this tag
   * @param {object} props
   * @param {string} props.title
   * @param {string} props.description
   * @param {number[]} props.tags
   *
   * @returns {Promise<Note>}
   */
  static async createFrom(props) {
    const { tags, title, description } = props;

    if (tags.length === 0)
      return this.createWithoutTags({ title, description });

    const noteSql = `
      INSERT INTO ${this.mainTableName} (title, description)
      VALUES (?, ?)
    `;

    const tagPlaceholders = Model.getPlaceholders(tags.length);
    const tagsSql = `
      SELECT * FROM ${this.tagsTableName}
      WHERE id IN (${tagPlaceholders})
    `;

    const [{ insertId }, tagRows] = await Promise.all([
      Model.query(noteSql, [title, description]),
      Model.query(tagsSql, tags),
    ]);

    // the lone `?` means it'll be a bulk insert
    // see https://stackoverflow.com/questions/8899802/how-do-i-do-a-bulk-insert-in-mysql-using-node-js
    const notesToTagsSql = `
      INSERT INTO ${this.notesToTagsTableName} (note_id, tag_id)
      VALUES ?
    `;

    const notesToTagsValues = tagRows.map(row => [insertId, row.id]);

    await Model.query(notesToTagsSql, [notesToTagsValues]);

    const note = await this.findById(insertId);

    return note;
  }

  /**
   * @param {string} name
   *
   * @returns {Promise<{id: number; name: string;}>}
   */
  static async createTag(name) {
    const insertTagSql = `
      INSERT INTO ${this.tagsTableName} (name)
      VALUES (?)
    `;

    const { insertId } = await Model.query(insertTagSql, [name]);

    return {
      id: insertId,
      name,
    };
  }

  /**
   * @param {number} id
   */
  static async deleteTag(id) {
    const deleteReferencesSql = `
      DELETE FROM ${this.notesToTagsTableName}
      WHERE tag_id = ?
    `;

    await Model.query(deleteReferencesSql, [id]);

    const deleteTagSql = `
      DELETE FROM ${this.tagsTableName}
      WHERE id = ?
    `;

    await Model.query(deleteTagSql, [id]);
  }
};
