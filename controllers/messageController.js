const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

//display a list of messages
exports.message_list = asyncHandler(async (req, res, next) => {
    const userMessages = await Message.find().populate().exec()

    res.render("message_list", { 
        title: "Welcome to the Message Board!",
        all_messages: userMessages
    });
});