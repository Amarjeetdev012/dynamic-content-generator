import express from 'express';
import { createContent, generateOutput } from '../controller/content.controller.js';

const router = express.Router();

router.post('/content', createContent);
router.post('/output', generateOutput);

export default router;
