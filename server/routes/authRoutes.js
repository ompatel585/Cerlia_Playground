// const express = require("express");
// const passport = require("passport");
// const { getUser, logout } = require("../controllers/authController");

// const router = express.Router();

// router.get(
//     "/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//         successRedirect: process.env.CLIENT_URL,
//         failureRedirect: "/login/failed",
//     })
// );

// router.get("/me", getUser);
// router.get("/logout", logout);

// module.exports = router;


import express from "express";
import passport from "passport";
import dotenv from 'dotenv'
dotenv.config();
import { getUser, logout } from "../controllers/authController.js";

const router = express.Router();

router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: "/login/failed",
    })
);

router.get("/me", getUser);
router.get("/logout", logout);

export default router;
