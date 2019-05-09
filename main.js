"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js"));
const ConfigFile = __importStar(require("./src/config"));
require('dotenv').config();
var client = new discord_js_1.default.Client();
let commands = [];
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
const Discord = __importStar(require("discord.js"));
class testCommand {
    constructor() {
        this._command = "test";
    }
    help() {
        return "This command does absolutely nothing! How fun :)";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    async runCommand(args, msgObject, client) {
        let embed = new Discord.RichEmbed()
            .setColor([0, 200, 0])
            .setTitle("Server Shutdown")
            .setDescription("This chat channel has now shutdown and please use an alternative channel!")
            .setImage(msgObject.guild.iconURL)
            .setFooter("This server is no longer being updated!")
            .setTimestamp(new Date());
        msgObject.channel.send(embed)
            .catch(console.error);
    }
}
exports.default = testCommand;
client.login(process.env.DISCORD_TOKEN);
client.login(ConfigFile.config.token);
