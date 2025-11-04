// server/models/services/qrCodeModel.js
import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true
    },
    format: {
        type: String,
        enum: ['png', 'svg', 'dataURL'],
        default: 'png'
    },
    size: {
        type: Number,
        default: 300
    },
    scale: {
        type: Number,
        default: 4
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    ipAddress: {
        type: String
    }
}, { timestamps: true });

const QRCodeModel = mongoose.model('QRCode', qrCodeSchema);

export default QRCodeModel;
