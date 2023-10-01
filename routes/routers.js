const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require('bcryptjs');

//require controller modules//
const user_controller = require("../controllers/userController");
const message_controller = require("../controllers/messageController");

router.get("/message", message_controller.message_list);

router.post("/message", message_controller.delete_message_post);

//sign up form routes

//GET sign up form
router.get("/message/sign-up", user_controller.sign_up_form_get);

//POST sign up form
router.post('/message/sign-up', user_controller.sign_up_form_post);

//GET nessage create form
router.get("/message/create_message", message_controller.create_message_get);

//POST message create form
router.post('/message/create_message', message_controller.create_message_post);

module.exports = router;