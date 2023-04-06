import Tagify from '@yaireo/tagify';
import fs from 'fs';

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
    const data = req.body;
    console.log('data', data);
    function filterText(input) {
      const str = data.mix;
      let filteredStr = str.replace(
        /{{{"value":"([^"]+)","prefix":"[#@]+"}}}/g,
        '$1'
      );
      filteredStr = filteredStr.replace(
        /\[\[{2}"value":"([^"]+)","prefix":"[#@]+"\]{2}/g,
        '$1'
      );
      return filteredStr.trim();
    }
    const str = filterText(data);
    console.log('str', str);
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


export const tagconverter = async (req, res) => {
  try {
    console.log('req.body data', req.body);
    const data = fs.readFileSync('people.json');
    const json = JSON.parse(data);
    const input = req.body.mix;
    let formattedMessage = input;
    const result = json.people.forEach((person) => {
      formattedMessage = formattedMessage
        .replace(
          '{{{"value":"{name}","prefix":"@"}}}',
          person.name.toLowerCase()
        )
        .replace('{{{"value":"{age}","prefix":"@"}}}', person.age);
    });
    console.log('formattedMessage', formattedMessage);
    console.log('result', result);
    res.render('field', { formattedMessage });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};
