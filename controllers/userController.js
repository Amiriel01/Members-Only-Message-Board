const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult, check } = require("express-validator");
const Message =require("../models/message");
const passport = require("passport");
const bcrypt = require("bcryptjs");


//display sign up form on GET//
exports.sign_up_form_get = asyncHandler(async (req, res, next) => {
    const allUserInformation = await User.find({}).exec()
    res.render("sign_up_form", {
        title: "Sign Up Here",
        allUserInformation: allUserInformation,
    })
});

confirmPassword = check('confirm_password')

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
        .custom(async (confirmPassword, {req}) => {
            console.log(confirmPassword)
            const password = req.body.password
            console.log(password)
            if(password !== confirmPassword) {
                throw new Error('Passwords must match.')
            }
            return true;
        })
        .escape(),


    asyncHandler(async (req, res, next) => {
        //extract validation errors from the request//
        const errors = validationResult(req);
        const hashPassword = await bcrypt.hashSync(req.body.password, 10)

        //create sign up form object with escaped and trimmed info//
        const user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hashPassword,
        });

        //When there are no errors, render form again with sanitized values and error messages//
        if (!errors.isEmpty()) {
            //get all user info from the form//
           
            res.render("sign_up_form", {
                title: "New User Sign Up",
                user: user,
                errors: errors.array(),
            });
            return;
        } else {
            //data from form is valid. Save item.
            await user.save();
            res.redirect("/users/member_join_form");
        }
    }),
]

//handle member form get
exports.member_join_form_get = asyncHandler(async(req, res, next) => {
    res.render("member_join_form")
})

//handle member form post
exports.member_join_form_post = asyncHandler(async(req, res, next) => {
    res.render("member_join_form")
})

exports.create_member_status = asyncHandler(async (res, req, next) => {

    const memberWord = "Tree";
    const user = await User.find().exec()
    let memberStatus = user.member

    if (memberWord === "Tree") {
        let memberStatus = true;
        res.redirect("/users/admin_join_form")
    } else {
        alert("Code Invalid. Please try again or return to message board.")
    }
})

//handle admin form get
exports.admin_join_form_get = asyncHandler(async(req, res, next) => {
    res.render("admin_join_form")
})

//handle admin form post
exports.admin_join_form_post = asyncHandler(async(req, res, next) => {
    res.render("admin_join_form")
})

exports.create_admin_status = asyncHandler(async (res, req, next) => {

    const adminWord = "Leaf";
    const user = await User.find().exec()
    let adminStatus = user.admin

    if (memberWord === "Leaf") {
        let adminStatus = true;
        res.redirect("/")
    } else {
        alert("Code Invalid. Please try again or return to message board.")
    }
})



