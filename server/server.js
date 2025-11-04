

// import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import session from 'express-session';
// import passport from 'passport';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// dotenv.config(); // Load environment variables

// import dynamicRoutes from './routes/dynamicRoutes.js';
// import authRoutes from './routes/authRoutes.js';
// import './config/passport.js'; // Load passport strategy



// const app = express();
// const port = 5000;

// // Connect MongoDB
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.log("❌ MongoDB Error:", err));

// // Middlewares
// app.use(cors({
//   origin: process.env.CLIENT_URL,
//   credentials: true,
// }));

// app.use(bodyParser.json());


// // Session & Passport
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     rolling: true, // refresh cookie expiration on each request
//     cookie: {
//       maxAge: 6 * 60 * 60 * 1000, // 1 day in ms
//       secure: false, // set true in prod with HTTPS
//       httpOnly: true,
//       sameSite: "lax",
//     },
//   })
// );


// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/api', dynamicRoutes);
// app.use('/api/auth', authRoutes);

// // Start server
// app.listen(port, () => {
//   console.log(`🚀 Server running on http://localhost:${port}`);
// });


import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';





import connectDB from './config/db.js';
// import sessionConfig from './config/session.js';

import dynamicRoutes from './routes/dynamicRoutes.js';
import authRoutes from './routes/authRoutes.js';
import qrRoutes from './routes/services/qrRoutes.js'
import './config/passport.js';
import sessionConfig from './config/session.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(bodyParser.json());

// Sessions & Passport
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', dynamicRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/qr', qrRoutes);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
