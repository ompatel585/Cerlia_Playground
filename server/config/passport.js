// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const passport = require("passport");
// const User = require("../models/userModel");

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: `${ process.env.SERVER_URL }/api/auth/google/callback`,
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             const existingUser = await User.findOne({ googleId: profile.id });
//             if (existingUser) return done(null, existingUser);

//             const user = new User({
//                 googleId: profile.id,
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 photo: profile.photos[0].value,
//             });

//             await user.save();
//             done(null, user);
//         }
//     )
// );

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((id, done) => {
//     User.findById(id).then((user) => done(null, user));
// });


import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


import User from "../models/userModel.js";
import dotenv from 'dotenv';
dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
console.log(GOOGLE_CLIENT_ID)

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) return done(null, existingUser);

            const user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value,
            });

            await user.save();
            done(null, user);
        }
    )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
});
