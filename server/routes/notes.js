const KoaRouter = require('@koa/router');

const Note = require('../models/Note');

async function getNoteInfo(ctx) {
  const { id } = ctx.params;

  if (!id) ctx.throw(400, 'No valid note id provided');

  const note = await Note.findById(id);

  ctx.body = {
    note: note.data,
  };
}

async function getAllNotes(ctx) {
  const notes = await Note.findAll();

  ctx.body = {
    notes: notes.map(note => note.data),
  };
}

async function createNote(ctx) {
  const { title, description, tags } = ctx.request.body;

  const note = await Note.createFrom({ title, description, tags });

  ctx.body = {
    note: note.data,
  };
}

const router = new KoaRouter({ prefix: '/api/note' });

router.get('/info/:id', getNoteInfo);
router.get('/list', getAllNotes);
router.post('/create', createNote);

module.exports = router;
