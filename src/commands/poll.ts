import * as discord from "discord.js";
import { IBotCommand } from "../api";

export default class poll implements IBotCommand {
    
    private readonly _command = "poll"
    
    help(): string {
        return "Creates a basic poll";
    }    

    isThisCommand(command: string): boolean {
        return command === this._command;
    }

    async runCommand(args: string[], msgObject: discord.Message, client: discord.Client): Promise<void> {
        
        msgObject.delete(0);

        if (args.length < 1) { return; }

        let pollEmbed = new discord.RichEmbed()
            .setTitle("Poll")
            .setDescription(args.join(" "))
            .setColor([0,200,0])
        
        let pollMessage = await msgObject.channel.send(pollEmbed);
        await (pollMessage as discord.Message).react("✅");
        await (pollMessage as discord.Message).react("❎");

        const filter = (reaction: discord.MessageReaction) => reaction.emoji.name === "✅" || reaction.emoji.name === "❎";
        const results = await (pollMessage as discord.Message).awaitReactions(filter, { time: 10000 })

        let resultsEmbed = new discord.RichEmbed()
            .setTitle("Poll Results")
            .setDescription(`Results For The Poll: ${args.join(" ")}`)
            .addField("✅:",`${results.get("✅").count-1} Votes`)
            .addField("❎:",`${results.get("❎").count-1} Votes`)
            .setColor([0,200,0])

        msgObject.channel.send(resultsEmbed);
        (pollMessage as discord.Message).delete(0);

    }
}