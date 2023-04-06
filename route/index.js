import express from 'express';
import { createContent, tagconverter, test } from '../controller/content.controller.js';
import tagify from '@yaireo/tagify';

const router = express.Router();

router.post('/content', createContent);
router.post('/test', test);
router.post('/tagconverter', tagconverter);

export default router;
