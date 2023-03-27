const express = require("express");
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/Admin.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isAdminLoggedOut = require("../middleware/isAdminLoggedOut");
const isAdminLoggedIn = require("../middleware/isAdminLoggedIn");
const Admin = require("../models/Admin.model");

// GET /admin/signin
router.get("/admin/signup", isAdminLoggedOut, (req, res) => {
    res.render("admin/signup");
});

// POST /admin/signup
router.post("/admin/signup", isAdminLoggedOut, (req, res) => {
    const { username, email, password } = req.body;

    // Check that username, email, and password are provided
    if (username === "" || email === "" || password === "") {
        res.status(400).render("admin/signup", {
            errorMessage:
                "All fields are mandatory. Please provide your username, email and password.",
        });

        return;
    }

    if (password.length < 6) {
        res.status(400).render("admin/signup", {
            errorMessage: "Your password needs to be at least 6 characters long.",
        });

        return;
    }

    //   ! This regular expression checks password for special characters and minimum length

    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(password)) {
        res
            .status(400)
            .render("admin/signup", {
                errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
            });
        return;
    }


    // Create a new admin - start by hashing the password
    bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
            // Create a admin and save it in the database
            return Admin.create({ username, email, password: hashedPassword });
        })
        .then((admin) => {
            res.redirect("/admin/login");
        })
        .catch((error) => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render("admin/signup", { errorMessage: error.message });
            } else if (error.code === 11000) {
                res.status(500).render("admin/signup", {
                    errorMessage:
                        "Username and email need to be unique. Provide a valid username or email.",
                });
            } else {
                next(error);
            }
        });
});

// GET /admin/login
router.get("/admin/login", isAdminLoggedOut, (req, res) => {
    res.render("admin/login");
});

// POST /admin/login
router.post("/admin/login", isAdminLoggedOut, (req, res, next) => {
    const { username, email, password } = req.body;

    // Check that username, email, and password are provided
    if (username === "" || email === "" || password === "") {
        res.status(400).render("admin/login", {
            errorMessage:
                "All fields are mandatory. Please provide username, email and password.",
        });

        return;
    }

    // Here we use the same logic as above
    // - either length based parameters or we check the strength of a password
    if (password.length < 6) {
        return res.status(400).render("admin/login", {
            errorMessage: "Your password needs to be at least 6 characters long.",
        });
    }

    // Search the database for a admin with the email submitted in the form
    Admin.findOne({ email })
        .then((admin) => {
            // If the admin isn't found, send an error message that user provided wrong credentials
            if (!admin) {
                res
                    .status(400)
                    .render("admin/login", { errorMessage: "Wrong credentials." });
                return;
            }

            // If admin is found based on the username, check if the in putted password matches the one saved in the database
            bcrypt
                .compare(password, admin.password)
                .then((isSamePassword) => {
                    if (!isSamePassword) {
                        res
                            .status(400)
                            .render("admin/login", { errorMessage: "Wrong credentials." });
                        return;
                    }

                    // Add the admin object to the session object
                    req.session.currentAdmin = admin.toObject();
                    // Remove the password field
                    delete req.session.currentAdmin.password;

                    res.redirect("/");
                })
                .catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
        })
        .catch((err) => next(err));
});

// GET /admin/logout
router.get("/admin/logout", isAdminLoggedIn, (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).render("admin/logout", { errorMessage: err.message });
            return;
        }

        res.redirect("/");
    });
});

module.exports = router;
