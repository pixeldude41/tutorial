"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
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
