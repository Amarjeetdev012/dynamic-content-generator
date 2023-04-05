import Tagify from '@yaireo/tagify';

export const createContent = (req, res) => {
  try {
    const data = {
      name: 'ram',
      age: 25,
      gender: 'male',
    };
    const input = req.body.input;
    const formattedMessage = input.replace(
      /{(\w+)}/g,
      (match, key) => data[key]
    );
    console.log('formattedMessage', formattedMessage);
    res.render('field', { formattedMessage });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

export const test = (req, res) => {
  try {
    console.log('data', req.body.text);
    const inputText = req.body.text;
    const tagify = new Tagify(addEventListener('input[name=tags]'));
    tagify.addTags(inputText);
    console.log('inputText', inputText);
    console.log('tagify', tagify);
    console.log('  tagify.addTags(inputText);', tagify.addTags(inputText));
    res.redirect('/');
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};
