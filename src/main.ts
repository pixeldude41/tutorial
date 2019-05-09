import discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";
import { MessageChannel } from "worker_threads";
import { Guild } from "discord.js";
require('dotenv').config();
var client = new discord.Client();
let commands: IBotCommand[] = [];
loadCommands(`${__dirname}/commands`)
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

client.on("message", msg => {

    //Ignore the message if it was sent by the bot
    if (msg.author.bot) { return; }

    //Ignore the message if it was sent in dms
    if (msg.channel.type == "dm") { return; }

    //Ignore messages that don't start with the prefix
    if(!msg.content.startsWith(ConfigFile.config.prefix)) { return; }

    //Handle the command
    handleCommand(msg);
})
async function handleCommand(msg: discord.Message) {

    //Split the string into the command and all of the args
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLowerCase();
    let args = msg.content.split(" ").slice(1);

    //Loop through all of our loaded commands
    for(const commandClass of commands){

        //Attempt to execute code ready in case of a possible error
        try{

            //Check if our command class is the correct one
            if (!commandClass.isThisCommand(command)){

                //Go to the next iteration of the loop if this isn't the correct command class
                continue;
            }

            //Pause execution whilst we run the command's code 
            await commandClass.runCommand(args, msg, client);
        }
        catch(exeception){

            //If there is an error, then log the exception
            console.log(exeception);
        }
    }
}

function loadCommands(commandsPAth: string) {

    //Exit if there are no commands
    if(!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) { return; }

    //Loop through all of the commands in our config file
    for(const commandName of ConfigFile.config.commands as string[]) {

        const commandsClass = require(`${commandsPAth}/${commandName}`).default;

        const command = new commandsClass() as IBotCommand

        commands.push(command);
    }
}

client.login(process.env.DISCORD_TOKEN);
