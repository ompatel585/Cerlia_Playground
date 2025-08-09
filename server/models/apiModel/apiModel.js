import mongoose from 'mongoose';

const RouteSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    methods: [{ type: String, enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], required: true }],
}, { timestamps: true });

export default mongoose.model('Route', RouteSchema);