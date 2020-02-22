import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class leave implements IBotCommand{

    private readonly _command = "leave"

    help(): string{
        return "leave channel";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):void{
        if(!msgObject.guild.voiceConnection){
            msgObject.channel.send("PLCHLD_NOTCOMMECT");
        }
        msgObject.member.voiceChannel.leave()
        


    }
}