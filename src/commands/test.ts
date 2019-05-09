import * as Discord from "discord.js";

import { IBotCommand } from "../api";

export default class testCommand implements IBotCommand {
    
    
    private readonly _command = "test"
    
    help(): string {
        return "This command does absolutely nothing! How fun :)";
    }    

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {

        let embed = new Discord.RichEmbed()
                        .setColor([0,200,0])
                        .setTitle("Server Shutdown")
                        .setDescription("This chat channel has now shutdown and please use an alternative channel!")
                        .setImage(msgObject.guild.iconURL)
                        .setFooter("This server is no longer being updated!")
                        .setTimestamp(new Date())
        
        msgObject.channel.send(embed)
            .catch(console.error);             
    }
}
