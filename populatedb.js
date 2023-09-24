// Get arguments passed on command line
const userArgs = process.argv.slice(2);

//require models
const User = require("./models/user");
const Message = require("./models/message");

const users = [];
const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await getUsers();
    await getMessages();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }

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
    console.log(`Added Message: ${message}`)
}

//add some sample users and messages to the database
async function getUsers() {
    console.log("Adding Users")
    await Promise.all([
        userCreate(
            "Sam",
            "Jones",
            "sam_jones34",
            "abewfo31!?",
            false,
            false,
        ),
        userCreate(
            "Ruth",
            "Smith",
            "ruthisgreat233",
            "ceoenvoevnowihc",
            true,
            false,
        ),
        userCreate(
            "Jarod",
            "Light",
            "lights784sky",
            "vevbobevoc003",
            true,
            true,
        ),
        userCreate(
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
        messageCreate(
            "Hello There",
            Date.now(),
            "How is everyone doing today? I am doing well."
        ),
        messageCreate(
            "Hi All",
            Date.now(),
            "What is the weather like today in your town? Mine is clowdy!"
        ),
        messageCreate(
            "Anyone Out There",
            Date.now(),
            "I just dropped in to say hello!"
        )
    ])
}