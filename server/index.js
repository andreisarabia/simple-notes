const Note = require('./models/Note');

(async () => {
  const res = await Note.findAll();
  console.log(res);
  const note = await Note.createFrom({
    title: 'example title',
    description: 'example text',
  });

  console.log(note);
  console.log(await Note.findAll());
})();
