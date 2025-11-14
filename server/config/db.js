//server/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB Error:", err);
        process.exit(1);
    }
};

export default connectDB;


// server/config/db.js
// import mongoose from 'mongoose';

// const MONGO_URI = process.env.MONGO_URI;
// if (!MONGO_URI) throw new Error("❌ Missing MONGO_URI in environment variables");

// let isConnected = false;

// const connectDB = async () => {
//   if (isConnected) return; // reuse existing connection

//   try {
//     const conn = await mongoose.connect(MONGO_URI);
//     isConnected = conn.connections[0].readyState === 1;
//     console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ MongoDB Error:", err);
//   }
// };

// export default connectDB;
