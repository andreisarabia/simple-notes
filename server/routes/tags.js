const KoaRouter = require('@koa/router');

const Note = require('../models/Note');

const router = new KoaRouter({ prefix: '/api/tag' });

async function getAllTags(ctx) {
  const allTags = await Note.getAllTags();

  ctx.body = {
    tags: allTags,
  };
}

async function deleteTag(ctx) {
  const { id } = ctx.params;

  if (!id || Number.isNaN(+id)) ctx.throw('No valid tag id provided', 400);

  await Note.deleteTag(+id);

  ctx.body = {
    msg: 'ok',
  };
}

router.get('/list', getAllTags);
router.delete('/:id', deleteTag);

module.exports = router;
