const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: "User", required: true
    },
    title: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 25,
    },
    timestamp: { 
        type: Date, default: Date.now 
    },
    message_text: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 250,
    }
});

MessageSchema.virtual("url").get(function() {
    return `/routers/message/${this._id}`;
})

MessageSchema.virtual("timestamp_formatted").get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
})

module.exports = mongoose.model("Message", MessageSchema);


