import express from 'express';
import { port } from './config.js';
import router from './route/index.js';

const app = express();

// app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home');
});
app.use('/', router);

app.listen(port, () => {
  console.log(`app is running on PORT ${port}`);
});
