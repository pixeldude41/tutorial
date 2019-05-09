import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import { Server } from "net";

export default class report implements IBotCommand {
    
    private readonly _command = "report"
    
    help(): string {
        return "";
    }    

    isThisCommand(command: string): boolean {
        return command === this._command;
    }  
    async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
        
        msgObject.delete(0);

        if (args.length < 1) { return; }

        let embed = new Discord.RichEmbed()
                        .setColor([0,200,0])
                        .setTitle("Report Your Problem!")
                        .setDescription(args.join(" "))
                        .setFooter("We will help you out as soon as we can!")
                        .setTimestamp(new Date())
        
        msgObject.channel.send("This is currently in beta!");
        msgObject.channel.send(embed)
            .catch(console.error);             
    }
}