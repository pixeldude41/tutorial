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
    setInterval(updateTimeChannelGMT, 1000)
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
const PREFIX = '!';
var version = '1.0';
client.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'user':
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

const dateTime = require("node-datetime");
var afkUsers = {}
function updateTimeChannelGMT () {
  var timeGMT = dateTime.create();
  var showTimeGMT = timeGMT.format('I:M:S p ');
  let timeChannelGMT = client.channels.get("576373699121381388")
  timeChannelGMT.setName(showTimeGMT+'GMT')
}
function checkUserAFK(messageMentions) {
    let mentionedUsers = messageMentions.array()
    for (i=0; i < mentionedUsers.length; i++) {
      if (afkUsers[mentionedUsers[i].tag] !== undefined) {
        return {userTag: mentionedUsers[i].tag, userReason: afkUsers[mentionedUsers[i].tag]}
      }
      return
    }
  }

  client.on('message', msg => {
    var content = msg.content
      parts = content.split(" ")
    if (afkUsers[msg.author.tag] !== undefined) {
      let noticeNoLongerAFK = new discord.RichEmbed()
        .setColor(3447003)
        .addField(`${msg.author.tag} is no longer AFK`, "Registered", true)
      msg.channel.send({ embed: noticeNoLongerAFK })
      afkUsers[msg.author.tag] = undefined
    }
    if (msg.content.startsWith(PREFIX+"afk ")) {
      afkUsers[msg.author.tag] = msg.content.substring(5)
      let noticeSetAFK = new discord.RichEmbed()
        .setColor(3447003)
        .addField(`You are now AFK for reason ${afkUsers[msg.author.tag]}`, "Registered", true)
      msg.channel.send({ embed: noticeSetAFK })
      console.log("DEBUG: Recieved AFK set message")
    }
    if (msg.mentions.users === undefined) return
        let checkAFKResult = checkUserAFK(msg.mentions.users)
        if (checkAFKResult !== undefined) {
          let noticeUserAFK = new discord.RichEmbed()
            .setColor(3447003)
            .addField(`${checkAFKResult.userTag} is currently AFK for reason: ${checkAFKResult.userReason}`, "Registered", true)
          msg.channel.send({ embed: noticeUserAFK })
          console.log("DEBUG: User checked is AFK")
        }        
  
  })
  
client.login(process.env.DISCORD_TOKEN);
client.login(ConfigFile.config.token);
