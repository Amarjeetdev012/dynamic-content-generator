import express from 'express';
import { createContent, test } from '../controller/content.controller.js';
import tagify from '@yaireo/tagify';

const router = express.Router();

router.post('/content', createContent);
router.post('/test', test);

export default router;
