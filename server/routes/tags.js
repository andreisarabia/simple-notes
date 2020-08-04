const KoaRouter = require('@koa/router');

const Note = require('../models/Note');

const router = new KoaRouter({ prefix: '/api/tag' });

async function getAllTags(ctx) {
  const allTags = await Note.getAllTags();

  ctx.body = {
    tags: allTags,
  };
}

router.get('/list', getAllTags);

module.exports = router;
