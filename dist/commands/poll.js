"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord = __importStar(require("discord.js"));
class poll {
    constructor() {
        this._command = "poll";
    }
    help() {
        return "Creates a basic poll";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    async runCommand(args, msgObject, client) {
        msgObject.delete(0);
        if (args.length < 1) {
            return;
        }
        let pollEmbed = new discord.RichEmbed()
            .setTitle("Poll")
            .setDescription(args.join(" "))
            .setColor([0, 200, 0]);
        let pollMessage = await msgObject.channel.send(pollEmbed);
        await pollMessage.react("✅");
        await pollMessage.react("❎");
        const filter = (reaction) => reaction.emoji.name === "✅" || reaction.emoji.name === "❎";
        const results = await pollMessage.awaitReactions(filter, { time: 10000 });
        let resultsEmbed = new discord.RichEmbed()
            .setTitle("Poll Results")
            .setDescription(`Results For The Poll: ${args.join(" ")}`)
            .addField("✅:", `${results.get("✅").count - 1} Votes`)
            .addField("❎:", `${results.get("❎").count - 1} Votes`)
            .setColor([0, 200, 0]);
        msgObject.channel.send(resultsEmbed);
        pollMessage.delete(0);
    }
}
exports.default = poll;
