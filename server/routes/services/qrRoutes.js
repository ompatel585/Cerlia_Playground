import express from 'express';
import { generateQRCode, getQRStats } from '../../controllers/services/qrController.js';

const router = express.Router();

router.post('/generate', generateQRCode);
router.get('/stats', getQRStats);

export default router;
