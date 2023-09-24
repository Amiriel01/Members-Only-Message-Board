//require models
const User = require("./models/user");
const Message = require("./models/message");

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

const users = [];
const messages = [];

//create functions to create the user and message objects
async function userCreate(first_name, last_name, username, password, member, admin) {
    const userDetail = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        password: password,
        member: member,
        admin: admin,
    };

    const user = new User(userDetail);

    await user.save();
    users[index] = user;
    console.log(`Added User: ${user}`);
}

async function messageCreate(title, timestamp, message_text) {
    const messageDetail = {
        title: title,
        timestamp: timestamp,
        message_text: message_text,
    };

    const message = new Message(messageDetail);

    await message.save();
    messages[index] = message;
    console.log(`Added Message: ${message}`)
}

//add some sample users and messages to the database
async function getUser() {
    console.log("Adding Users")
    await Promise.all([
        userCreate(0,
            "Sam",
            "Jones",
            "sam_jones34",
            "abewfo31!?",
            false,
            false,
        ),
        userCreate(1,
            "Ruth",
            "Smith",
            "ruthisgreat233",
            "ceoenvoevnowihc",
            true,
            false,
        ),
        userCreate(2,
            "Jarod",
            "Light",
            "lights784sky",
            "vevbobevoc003",
            true,
            true,
        ),
        userCreate(3,
            "Test",
            "Account",
            "test2023",
            "account2023",
            true,
            true,
        )
    ])
}

async function getMessages() {
    console.log("Adding Messages")
    await Promise.all([
        messageCreate(0,
            "Hello There",
            Date.now(),
            "How is everyone doing today? I am doing well."
        ),
        messageCreate(1,
            "Hi All",
            Date.now(),
            "What is the weather like today in your town? Mine is clowdy!"
        ),
        messageCreate(2,
            "Anyone Out There",
            Date.now(),
            "I just dropped in to say hello!"
        )
    ])
}