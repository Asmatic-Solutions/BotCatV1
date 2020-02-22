import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import join from "./join";
const ytdl = require("ytdl-core");
let queue = new Array;

export default class play implements IBotCommand{

    private readonly _command = "play";
    j  = new join();

    help(): string{
        return "Am I Online command";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):void{
        if (!msgObject.guild.voiceConnection)
        this.j.runThisCommand(null, msgObject, client);
        
            queue.push(args[0]);
            if (msgObject.guild.voiceConnection.speaking == false) {
                playUrl(args, msgObject, client);
            }
    }
}


function playUrl(args: string[], msgObject:Discord.Message, client:Discord.Client){
    
    const stream = ytdl(queue[0], { filter : 'audioonly' });
    console.log(queue[0]);
    
    msgObject.guild.voiceConnection.playStream(stream);
    console.log(stream);
}