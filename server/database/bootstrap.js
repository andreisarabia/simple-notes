const db = require('./index');

async function setupNotesTable() {
  const notesSql = `
    CREATE TABLE IF NOT EXISTS \`notes\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`title\` VARCHAR(255) NOT NULL,
      \`description\` MEDIUMTEXT,
      \`creation_time\` DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`)
    )
  `;

  await db.query(notesSql);
}

async function setupTagsTable() {
  const tagsSql = `
    CREATE TABLE IF NOT EXISTS \`tags\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`name\` VARCHAR(255),
      PRIMARY KEY (\`id\`)
    )
  `;

  await db.query(tagsSql);
}

async function setupNotesToTagsTable() {
  const notesToTagsSql = `
    CREATE TABLE IF NOT EXISTS \`notes_to_tags\` (
      \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
      \`note_id\` INT UNSIGNED NOT NULL,
      \`tag_id\` INT UNSIGNED NOT NULL,
      FOREIGN KEY (\`note_id\`) REFERENCES notes (\`id\`),
      FOREIGN KEY (\`tag_id\`) REFERENCES tags (\`id\`),
      PRIMARY KEY (\`id\`)
    )
  `;

  await db.query(notesToTagsSql);
}

async function bootstrap() {
  await Promise.all([setupNotesTable(), setupTagsTable()]);

  await setupNotesToTagsTable();
}

bootstrap()
  .then(() => {
    console.log('Done creating tables.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Something went wrong while prepping the database: ', err);
    process.exit(1);
  });
