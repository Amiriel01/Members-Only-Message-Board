const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const Message = require("../models/message");
const { body, validationResult } = require("express-validator");
const user = require("../models/user");

//display a list of messages
exports.message_list = asyncHandler(async (req, res, next) => {
    // const userMessages = await Message.find().populate().exec()
    let user = req.user
    const [userMessages] = await Promise.all([
        Message.find().populate("user").exec(),
    ])

    res.render("message_list", {
        title: "Welcome to the Message Board!",
        all_messages: userMessages,
        user: user
    });
});

exports.create_message_get = asyncHandler(async (req, res, next) => {
    res.render("create_message")
})

exports.create_message_post = [
    //validate and sanitize the message form fields//
    body("title", "Title cannot be blank.")
        .trim()
        .isLength({ min: 1 })
        .isLength({ max: 50 })
        .escape(),
    body("message_text", "Message text cannot be blank.")
        .trim()
        .isLength({ min: 1 })
        .isLength({ max: 250 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        //extract validation errors from the request//
        const errors = validationResult(req);
console.log(req.user)
        //create sign up form object with escaped and trimmed info//
        const message = new Message({
            title: req.body.title,
            message_text: req.body.message_text,
            user: req.user
        });


        //When there are no errors, render form again with sanitized values and error messages//
        if (!errors.isEmpty()) {
            //get all user info from the form//

            res.render("create_message", {
                title: "Create New Message",
                message: message,
                errors: errors.array(),
            });
            return;
        } else {
            //data from form is valid. Save item.
            await message.save();
            res.redirect("/");
        }
    })
]

exports.delete_message_post = async (req, res, next) => {
    const messageId = await Message.findById(req.params.id);

    await Message.findByIdAndRemove(req.body.messageId); 
    res.redirect("/");
}