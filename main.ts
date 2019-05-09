import discord, { MessageEmbed } from "discord.js";

import * as ConfigFile from "./src/config";
require('dotenv').config();
var client = new discord.Client();
import { IBotCommand } from "./src/api";
import { MessageChannel } from "worker_threads";
import { Guild } from "discord.js";

let commands: IBotCommand[] = [];
client.on('ready', () => {
    console.log("I am ready");

    client.user.setActivity("EXL|24/7", { type: "WATCHING" });
})

client.on("guildMemberAdd", member => {

    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome") as discord.TextChannel;
    welcomeChannel.send(`Welcome ${member.displayName}! We hope you enjoy your time here!`)

    member.send("Thank you for Joining our server!")
    member.send("Hello, My name is EXL! As you know I'm just a regular bot and anyways if you need help with anything in the near future just type help in chat we will be right their to help you out gladly! Best Wishes EXL ")

                
})

client.on("guildMemberRemove", member => {

    let welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome") as discord.TextChannel;
    welcomeChannel.send(`We are sorry that you had to go ${member.displayName} :(`)

})

client.on('message', (msg) => {
    if(msg.content == "ping") {
        msg.channel.send("pong!");
    }
});

export default class testCommand implements IBotCommand {
    
    
    private readonly _command = "test"
    
    help(): string {
        return "This command does absolutely nothing! How fun :)";
    }    

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: discord.Message, client: discord.Client): Promise<void> {

        let embed = new discord.RichEmbed()
                        .setColor([0,200,0])
                        .setTitle("Server Shutdown")
                        .setDescription("This chat channel has now shutdown and please use an alternative channel!")
                        .setImage(msgObject.guild.iconURL)
                        .setFooter("This server is no longer being updated!")
                        .setTimestamp(new Date())
        
        msgObject.channel.send(discord.RichEmbed)
            .catch(console.error);             
    }
}

client.login(process.env.DISCORD_TOKEN);
client.login(ConfigFile.config.token);
