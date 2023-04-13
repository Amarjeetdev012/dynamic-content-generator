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
    const input = req.body.mixedinput;
    const text = input.replace(/\[\[\{\"value\":\"(\w+)\"\}\]\]/g, '{data.$1}');
    return res.status(200).send(text);
  } catch (error) {
    return res.status(500).send({ status: false, message: error });
  }
};

export const jsondata = (req, res) => {
  const data = fs.readFileSync('people.json');
  const json = JSON.parse(data);
  res.status(200).send(json);
};
