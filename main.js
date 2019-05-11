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
    var role = member.guild.roles.find("name", "Alpha");
    member.addRole(role);
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
const PREFIX = '!';
var version = '1.0';
client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'user9':
            const embed = new discord_js_1.default.RichEmbed()
                .setTitle('User Information')
                .addField('Player Name', message.author.username, true)
                .addField('Version', version, true)
                .addField('Current Server', message.guild.name, true)
                .setColor(0xF1C40F)
                .setThumbnail(message.author.avatarURL)
                .setFooter('As you know I am 24/7!');
            message.channel.sendEmbed(embed);
            break;
    }
});
client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'serverinfo':
            const embed = new discord_js_1.default.RichEmbed()
                .setTitle('ServerInfo')
                .setDescription(`The Owner of the server is EXLONE and we are a small gaming community!`)
                .addField(`Member Count`, (`The server curently has ${message.guild.memberCount} Members!`))
                .addField('Extra', ('Also btw this Server is currently in Alpha'))
                .addField('Version', version, true)
                .setColor(0xF1C40F)
                .setThumbnail(message.guild.iconURL)
                .setFooter('Thanks for requesting me!');
            message.channel.sendEmbed(embed);
            break;
    }
});
client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case '-':
            const embed = new discord_js_1.default.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription(args.join(" "))
                .setColor([0, 200, 0])
                .setThumbnail(message.author.avatarURL)
                .setFooter('CustomEmbed');
            message.channel.sendEmbed(embed);
            break;
    }
});
client.on(`message`, async (message) => {
    if (message.content.startsWith(`${PREFIX}createchannel`)) {
        const args = message.content.slice(15);
        message.guild.createChannel(`${args}`).then(channel => {
            channel.setTopic(`Creates a channel!`);
        });
    }
});
client.on(`message`, async (message) => {
    if (message.content.startsWith(`${PREFIX}deletechannel`)) {
        const args = message.content.slice(15);
        message.channel.delete(`${args}`).then();
    }
});
client.on("message", (message) => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'commands':
            const embed = new discord_js_1.default.RichEmbed()
                .setTitle('Commands')
                .addField('Prefix', (`!`))
                .setColor([0, 200, 0])
                .setThumbnail(message.guild.icon)
                .setFooter('These are all the commands which are available');
            message.channel.sendEmbed(embed);
            break;
    }
});
client.login(process.env.DISCORD_TOKEN);
