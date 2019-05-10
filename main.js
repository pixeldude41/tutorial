"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importDefault(require("discord.js")); 
require('dotenv').config();
var client = new discord_js_1.default.Client();
let commands = [];
let afkUsers = {};

//this is time update function

function updateTimeChannelGMT () {
  var timeGMT = dateTime.create();
  var showTimeGMT = timeGMT.format('I:M:S p ');
  let timeChannelGMT = client.channels.get("576373699121381388")
  timeChannelGMT.setName(showTimeGMT+'GMT')
}

//check user is AFK

function checkUserAFK(messageMentions) {
  let mentionedUsers = messageMentions.array()
  for (i=0; i < mentionedUsers.length; i++) {
    if (afkUsers[mentionedUsers[i].tag] !== undefined) {
      return {userTag: mentionedUsers[i].tag, userReason: afkUsers[mentionedUsers[i].tag]}
    }
    return
  }
}



client.on('ready', () => { 
    console.log("I am ready");
    client.user.setActivity("EXL|24/7", { type: "WATCHING" });
	setInterval(updateTimeChannelGMT, 1000) //set interval for time update function          
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
client.on('message', (message) => { //you can merge this
    if (message.content == "ping") {
        message.channel.send("pong!");
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
	if (afkUsers[message.author.tag] !== undefined) {
		let noticeNoLongerAFK = new Discord.RichEmbed()
			.setColor(3447003)
			.addField(`${message.author.tag} is no longer AFK`, "Registered", true)
		message.channel.send({ embed: noticeNoLongerAFK })
		afkUsers[message.author.tag] = undefined
	}
	if (message.content.startsWith(PREFIX+"afk ")) {
		afkUsers[message.author.tag] = message.content.substring(5)
		let noticeSetAFK = new Discord.RichEmbed()
			.setColor(3447003)
			.addField(`You are now AFK for reason ${afkUsers[message.author.tag]}`, "Registered", true)
		message.channel.send({ embed: noticeSetAFK })
	}
	if (message.mentions.users === undefined) return
		let checkAFKResult = checkUserAFK(message.mentions.users)
		if (checkAFKResult !== undefined) {
			let noticeUserAFK = new Discord.RichEmbed()
				.setColor(3447003)
				.addField(`${checkAFKResult.userTag} is currently AFK for reason: ${checkAFKResult.userReason}`, "Registered", true)
			message.channel.send({ embed: noticeUserAFK })
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
        case 'customembed':
            const embed = new discord_js_1.default.RichEmbed()
                .setAuthor(message.author.username)
                .setDescription(args.join(" "))
                .setColor([0, 200, 0])
                .setThumbnail(message.author.avatarURL)
                .setFooter('Registered');
            message.channel.sendEmbed(embed);
            break;
    }
});
client.login(process.env.DISCORD_TOKEN);
