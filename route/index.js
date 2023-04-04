import express from 'express';
import { createContent } from '../controller/content.controller.js';

const router = express.Router();

router.post('/content', createContent);

export default router;
