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
class report {
    constructor() {
        this._command = "report";
    }
    help() {
        return "";
    }
    isThisCommand(command) {
        return command === this._command;
    }
    async runCommand(args, msgObject, client) {
        msgObject.delete(0);
        if (args.length < 1) {
            return;
        }
        let embed = new Discord.RichEmbed()
            .setColor([0, 200, 0])
            .setTitle("Report Your Problem!")
            .setDescription(args.join(" "))
            .setFooter("We will help you out as soon as we can!")
            .setTimestamp(new Date());
        msgObject.channel.send("This is currently in beta!");
        msgObject.channel.send(embed)
            .catch(console.error);
    }
}
exports.default = report;
