const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

//display a list of messages
exports.message_list = asyncHandler(async (req, res, next) => {
    // const userMessages = await Message.find().populate().exec()

    const [user, userMessages] = await Promise.all([
        Message.find().populate("username").exec(),
        User.find().exec()
    ])

    res.render("message_list", { 
        title: "Welcome to the Message Board!",
        all_messages: userMessages,
        user:user
    });
});

exports.create_message_get = asyncHandler(async(req, res, next) => {
    res.render("create_message")
})

exports.create_message_post = asyncHandler(async(req, res, next) => {
    res.render("create_message")
})