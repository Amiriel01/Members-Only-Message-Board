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
        confirm_password,
        member: member,
        admin: admin,
    };

    const user = new User(userDetail);

    await user.save();
    users[index]= user
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
    messages[index]= message
    console.log(`Added Message: ${message}`)
}

async function getUsers() {
    console.log("Adding Users")
    await Promise.all([
        userCreate()
    ])
}

async function getMessages() {
    console.log("Adding Messages")
    await Promise.all([
        messageCreate()
    ])
}
// //add some sample users and messages to the database
// async function getUsers() {
//     console.log("Adding Users")
//     await Promise.all([
//         userCreate(
//             "Sam",
//             "Jones",
//             "sam_jones34",
//             "abewfo31!?",
//             true,
//             false,
//         ),
//         userCreate(
//             "Ruth",
//             "Smith",
//             "ruthisgreat233",
//             "ceoenvoevnowihc",
//             true,
//             false,
//         ),
//         userCreate(
//             "Jarod",
//             "Light",
//             "lights784sky",
//             "vevbobevoc003",
//             true,
//             true,
//         ),
//         userCreate(
//             "Test",
//             "Account",
//             "test2023",
//             "account2023",
//             true,
//             true,
//         )
//     ])
// }

// async function getMessages() {
//     console.log("Adding Messages")
//     await Promise.all([
//         messageCreate(
//             users[0]._id,
//             "Hello There",
//             Date.now(),
//             "How is everyone doing today? I am doing well."
//         ),
//         messageCreate(
//             users[0]._id,
//             "Hi All",
//             Date.now(),
//             "What is the weather like today in your town? Mine is clowdy!"
//         ),
//         messageCreate(
//             users[1]._id,
//             "Anyone Out There",
//             Date.now(),
//             "I just dropped in to say hello!"
//         ),
//         messageCreate(
//             users[2]._id,
//             "Today is Sunday.",
//             Date.now(),
//             "Yay, Sunday!"
//         ),
//         messageCreate(
//             users[3]._id,
//             "Tomorrow is Monday.",
//             Date.now(),
//             " Booo Monday!"
//         )
//     ])
// }