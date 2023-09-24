const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    users: {
        type: Schema.Types.ObjectId, ref: "User", required: true
    },
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25,
    },
    timestamp: { 
        type: Date, default: Date.now, required: true 
    },
    message_text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 250,
    }
});

module.exports = mongoose.model("Message", MessageSchema);

// { timestamps: true },
    // timestamps: {
    //     createdAt: 'created_at',
    //     updatedAt: 'updated_at',
    // }
