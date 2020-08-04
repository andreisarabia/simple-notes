const Koa = require('koa');
const koaBodyParser = require('koa-bodyparser');

const notesRouter = require('./routes/notes');
const tagsRouter = require('./routes/tags');

const allRouters = [notesRouter, tagsRouter];

const app = new Koa();

app.use(koaBodyParser());

app.use(async (ctx, next) => {
  ctx.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'deny',
    'X-XSS-Protection': '1; mode=block',
  });

  await next();
});

allRouters.forEach(router => {
  app.use(router.routes());
  app.use(router.allowedMethods());
});

const apiRoutesMap = new Map(
  allRouters.flatMap(({ stack }) =>
    stack.map(layer => [layer.path, layer.methods])
  )
);

console.log('Registered API routes: ', apiRoutesMap);

module.exports = app;
