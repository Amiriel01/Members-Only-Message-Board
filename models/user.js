// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

//create user schema
const UserSchema = new Schema({
    first_name: { 
        type: String, required: true, minLength: 1, maxLength: 25 
    },
    last_name: { 
        type: String, required: true, minLength: 1, maxLength: 25 
    },
    username: {
        type: String, 
        required: true,
        unique: true,
        minLength: 5,
        maxLength: 25,
    },
    password: {
        type: String, 
        required: true,
        maxLength: 25,
    },
    member: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("User", UserSchema);

