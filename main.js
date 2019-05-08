"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
require('dotenv').config();
var client = new discord_js_1.default.Client();
client.on('ready', () => {
    console.log("I am ready");
    client.user.setActivity("EXL|24/7", { type: "WATCHING" });
});
client.on("guildMemberAdd", member => {
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome");
    welcomeChannel.send(`Welcome ${member.displayName}! We hope you enjoy your time here!`);
    member.send("Thank you for Joining our server!");
    member.send("Hello, My name is EXL! As you know I'm just a regular bot and anyways if you need help with anything in the near future just type help in chat we will be right their to help you out gladly! Best Wishes EXL ");
});
client.on("guildMemberRemove", member => {
    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome");
    welcomeChannel.send(`We are sorry that you had to go ${member.displayName} :(`);
});
client.on('message', (msg) => {
    if (msg.content == "ping") {
        msg.channel.send("pong!");
    }
});
client.login(process.env.DISCORD_TOKEN);
