const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

//require controller modules//
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

//message home route
router.get("/message", message_controller.message_list)

//sign up form routes

//GET sign up form
router.get("/message/sign-up", user_controller.sign_up_form_get);

//POST sign up form
router.post('/message/sign-up', user_controller.sign_up_form_post);

module.exports = router;