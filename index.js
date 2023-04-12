import express from 'express';
import fs from 'fs';
import { port } from './config.js';
import router from './route/index.js';

const app = express();

// app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  const data = fs.readFileSync('people.json');
  const json = JSON.parse(data);
  res.render('test', { data: json });
});
app.use('/', router);

app.listen(port, () => {
  console.log(`app is running on PORT ${port}`);
});
