// //server/models/apiModel/apiModel.js
// import mongoose from 'mongoose';

// const RouteSchema = new mongoose.Schema({
//     path: { type: String, required: true, unique: true },
//     methods: [{ type: String, enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], required: true }],
// }, { timestamps: true });

// export default mongoose.model('Route', RouteSchema);


// server/models/apiModel/apiModel.js
import mongoose from 'mongoose';

const RouteSchema = new mongoose.Schema({
    path: { type: String, required: true, unique: true },
    methods: [{ type: String, enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], required: true }],
    serviceType: { type: String, default: null }, // e.g. "qr-generator", "chatgpt"
    inputSchema: { type: Array, default: [] },     // store the array of fields
    outputSpec: {                                     // store response/format metadata
        statusCode: { type: Number, default: 200 },
        bodyExample: { type: mongoose.Schema.Types.Mixed, default: {} },
        cacheTimeSec: { type: Number, default: 0 }
    }
}, { timestamps: true });

export default mongoose.model('Route', RouteSchema);
