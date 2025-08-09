// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     googleId: String,
//     name: String,
//     email: String,
//     photo: String,
// });

// module.exports = mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    photo: String,
});

const User = mongoose.model("User", userSchema);

export default User;
