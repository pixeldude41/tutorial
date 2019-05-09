import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import { Server } from "net";

export default class serverinfo implements IBotCommand {
    
    private readonly _command = "serverinfo"
    
    help(): string {
        return "This command does absolutely nothing! How fun :)";
    }    

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        let embed = new Discord.RichEmbed()
                        .setColor([0,200,0])
                        .setTitle("Server Info")  
                        .setFooter("If you want to know more about the Auto Moderator Type !AutoMod") 
                        .setImage(msgObject.guild.iconURL)
                        .setDescription("Welcome to Our Server, Here are some details about the server!")
                        .addField("Server Count:", `Our server currently has ${msgObject.guild.memberCount} Members`)
                        
        msgObject.channel.send(embed)
            .catch(console.error);               
    }
}