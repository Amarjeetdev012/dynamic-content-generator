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
    res.render('output', { data: formattedMessage });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

export const test = (req, res) => {
  try {
    const data = req.body;
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
    const inputText = req.body.text;
    const tagify = new Tagify(addEventListener('input[name=tags]'));
    tagify.addTags(inputText);
    res.redirect('/');
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

export const tagconverter = async (req, res) => {
  try {
    const data = fs.readFileSync('people.json');
    const json = JSON.parse(data);
    console.log('req.body data', req.body);
    const input = req.body.mixedinput;
    console.log('input', input);
    const formattedMessages = json.people.map((person) => {
      let formattedMessage = input
        .replace(
          /\[\[\{"value":"{name}","prefix":"@"\}\]\]/g,
          person.name.toLowerCase()
        )
        .replace(/\[\[\{"value":"{age}","prefix":"@"\}\]\]/g, person.age)
        .replace(/\[\[\{"value":"{gender}","prefix":"@"\}\]\]/g, person.gender);
      return formattedMessage;
    });
    console.log('output', formattedMessages);
    res.render('field', { data: formattedMessages });
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};
