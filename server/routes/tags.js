const KoaRouter = require('@koa/router');

const Note = require('../models/Note');

const router = new KoaRouter({ prefix: '/api/tag' });

async function getAllTags(ctx) {
  const allTags = await Note.getAllTags();

  ctx.body = {
    tags: allTags,
  };
}

async function createTag(ctx) {
  const { tagName } = ctx.request.body;

  if (typeof tagName !== 'string' || tagName.trim() === '')
    ctx.throw(400, 'No valid tag name provided.');

  const newTag = await Note.createTag(tagName);

  ctx.body = {
    tag: newTag,
  };
}

async function deleteTag(ctx) {
  const { id } = ctx.params;

  if (!id || Number.isNaN(+id)) ctx.throw(400, 'No valid tag id provided');

  await Note.deleteTag(+id);

  ctx.body = {
    msg: 'ok',
  };
}

router.get('/list', getAllTags);
router.post('/create', createTag);
router.delete('/:id', deleteTag);

module.exports = router;
