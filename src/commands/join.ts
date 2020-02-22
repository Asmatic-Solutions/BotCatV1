import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class join implements IBotCommand{

    private readonly _command = "join"

    help(): string{
        return "Joins channel";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):void{
        if (!msgObject.member.voiceChannel) {
            msgObject.channel.send("PLACE_HLD_VOICECHANNELREQUIERE");
            return;
        }
        if(msgObject.guild.voiceConnection){
            return;
        }
        msgObject.member.voiceChannel.join();
        
    }
}