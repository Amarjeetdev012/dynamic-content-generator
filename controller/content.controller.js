import ejs from 'ejs';

export const createContent = (req, res) => {
  const template = req.body.template;
  const data = req.body.data;
  const compiledTemplate = ejs.compile(`${template}`);
  console.log('template', compiledTemplate());
  const output = compiledTemplate(data);
  console.log('output', output);
  res.render('output', { output });
};
