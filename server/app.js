const Koa = require('koa');

const notesRouter = require('./routes/notes');

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'deny',
    'X-XSS-Protection': '1; mode=block',
  });

  await next();
});

app.use(notesRouter.routes());
app.use(notesRouter.allowedMethods());

const apiRoutesMap = new Map(
  notesRouter.stack.map(layer => [layer.path, layer.methods])
);

console.log('Registered API routes: ', apiRoutesMap);

module.exports = app;
