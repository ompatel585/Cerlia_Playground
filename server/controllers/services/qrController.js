// server/controllers/services/qrController.js

import QRCode from 'qrcode';
import QRCodeModel from '../../models/services/qrCodeModel.js';


/**
 * @desc    Generate QR code
 * @route   POST /api/qr/generate
 * @access  Public (no auth for MVP)
 */
export const generateQRCode = async (req, res) => {
    try {
        const { data, format = 'png', size = 300, scale = 4 } = req.body;

        // Validation
        if (!data) {
            return res.status(400).json({
                success: false,
                message: 'Data is required to generate QR code'
            });
        }

        // QR generation options
        const qrOptions = {
            width: size,
            scale: Number(scale),
            margin: 1,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            },
            errorCorrectionLevel: 'M'
        };

        let qrResult;

        // Generate based on format
        switch (format) {
            case 'svg':
                qrResult = await QRCode.toString(data, { ...qrOptions, type: 'svg' });
                break;
            case 'png':
            case 'dataURL':
            default:
                qrResult = await QRCode.toDataURL(data, qrOptions);
        }

        // Save to database for tracking (optional)
        try {
            await QRCodeModel.create({
                data,
                format,
                size,
                scale,
                userId: req.user?._id, // if auth is enabled later
                ipAddress: req.ip
            });
        } catch (dbError) {
            console.warn('Failed to save QR to DB:', dbError.message);
            // Don't fail the request if DB save fails
        }

        // Success response
        res.status(200).json({
            success: true,
            data: {
                qrCode: qrResult,
                format,
                size,
                scale,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('QR Generation Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error generating QR code',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

/**
 * @desc    Get QR code generation stats
 * @route   GET /api/qr/stats
 * @access  Public
 */
export const getQRStats = async (req, res) => {
    try {
        const totalQRs = await QRCodeModel.countDocuments();

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayQRs = await QRCodeModel.countDocuments({
            createdAt: { $gte: today }
        });

        const formatStats = await QRCodeModel.aggregate([
            { $group: { _id: '$format', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalQRCodes: totalQRs,
                todayQRCodes: todayQRs,
                formatBreakdown: formatStats
            }
        });
    } catch (error) {
        console.error('Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching stats'
        });
    }
};
