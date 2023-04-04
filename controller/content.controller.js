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

export const generateOutput = (req, res) => {
  console.log('called second');
  const data = req.body;
  console.log('data', data);
  res.render('output', { fields: data });
};
