import express from 'express';
import {
  createContent,
  jsondata,
  tagconverter,
  test,
} from '../controller/content.controller.js';

const router = express.Router();

router.post('/content', createContent);
router.post('/test', test);
router.post('/tagconverter', tagconverter);
router.get('/data', jsondata);

export default router;
