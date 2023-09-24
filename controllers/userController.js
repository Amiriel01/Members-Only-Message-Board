const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message =require("../models/message");

//display sign up form on GET//
exports.sign_up_form_get = asyncHandler(async (req, res, next) => {
    res.render("sign_up_form", {
        title: "Sign Up Here"
    })
});

//handle sign up form on POST//
exports.sign_up_form_post = [
    //validate and sanitize the sign up form fields//
    body("first_name", "First name cannot be blank.")
        .trim()
        .isLength({ min: 1 })
        .isLength({ max: 25 })
        .escape(),
    body("last_name", "Last name cannot be blank.")
        .trim()
        .isLength({ min: 1 })
        .isLength({ max: 25 })
        .escape(),
    body("username", "Username cannot be blank.")
        .trim()
        .isLength({ min: 5 })
        .isLength({ max: 25 })
        .escape(),
    body("password", "Password cannot be blank.")
        .trim()
        .isLength({ min: 5 })
        .isLength({ max: 25 })
        .escape(),
    body("confirm_password", "Password cannot be blank.")
        .trim()
        .isLength({ min: 5 })
        .isLength({ max: 25 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        //extract validation errors from the request//
        const errors = validationResult(req);

        //create sign up form object with escaped and trimmed info//
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.first_username,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
        });

        //When there are no errors, render form again with sanitized values and error messages//
        if (!errors.isEmpty()) {
            //get all user info from the form//
           
            res.render("sign_up_form", {
                title: "New User Sign Up",
                user: user,
                errors: errors.array(),
            });
        } else {
            //daata from form is valid. Save item.
            await user.save();
            res.redirect(index.url);
        }
    }),
]
