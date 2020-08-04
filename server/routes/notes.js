const KoaRouter = require('@koa/router');

const Note = require('../models/Note');

const router = new KoaRouter({ prefix: '/api/note' });

router.get('/info/:id', async ctx => {
  const { id } = ctx.params;

  if (!id) ctx.throw('No valid note id provided', 400);

  const note = await Note.findById(id);

  ctx.body = {
    note: note.props,
  };
});

router.get('/all', async ctx => {
  const notes = await Note.findAll();

  ctx.body = {
    notes: notes.map(note => note.props),
  };
});

module.exports = router;
