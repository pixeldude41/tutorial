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
class serverinfo {
    constructor() {
        this._command = "serverinfo";
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
            .setTitle("Server Info")
            .setFooter("If you want to know more about the Auto Moderator Type !AutoMod")
            .setImage(msgObject.guild.iconURL)
            .setDescription("Welcome to Our Server, Here are some details about the server!")
            .addField("Server Count:", `Our server currently has ${msgObject.guild.memberCount} Members`);
        msgObject.channel.send(embed)
            .catch(console.error);
    }
}
exports.default = serverinfo;
