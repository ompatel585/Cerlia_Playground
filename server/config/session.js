// //server/config/session.js
// import session from 'express-session';


// const sessionConfig = session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     rolling: true, // refresh cookie expiration on each request
//     cookie: {
//         maxAge: 6 * 60 * 60 * 1000, // 6 hours
//         secure: false, // true in prod with HTTPS
//         httpOnly: true,
//         sameSite: "lax",
//     },
// });

// export default sessionConfig;


import session from "express-session";

const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 6 * 60 * 60 * 1000, // 6 hours
    secure: true,               // must be true in production with HTTPS
    httpOnly: true,
    sameSite: "none",           // must be 'none' for cross-site cookies
  },
 
});

export default sessionConfig;
