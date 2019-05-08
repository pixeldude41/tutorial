import discord from "discord.js";

require('dotenv').config();
var client = new discord.Client();

client.on('ready', () => {
    console.log("I am ready");

    client.user.setActivity("EXL|24/7", { type: "WATCHING" });
})

client.on('message', (msg) => {
    if(msg.content == "ping") {
        msg.channel.send("pong!");
    }
});

client.login(process.env.DISCORD_TOKEN);