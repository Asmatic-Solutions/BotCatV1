import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class rr implements IBotCommand{

    private readonly _command = "rr";

    help(): string{
        return "random disconnect";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):void{
        // Check if user is in voice channel
        if(!msgObject.member.voiceChannel){
            msgObject.channel.send("You must be in a voice channel to play russian roulette");
            return;
        }
        let vMembers = new Array;
        //Fetch all voice channel users
        //Takes every guildMember of the "member collection" and puts it into an array - Basically taking the members out of a very ugly data structure
        for (let[snowflake, guildMember] of msgObject.member.voiceChannel.members){
            vMembers.push(guildMember);
        }
        
        vMembers.sort(() => Math.random() - 0.5); //Sorts randomly the array of guild members
        if(vMembers[0].user.id === client.user.id) //If its the own bot then go for another victim
            vMembers.pop();


        //wait a lil bit b4 disconnecting   
        setTimeout(() => {           
            vMembers[0].setVoiceChannel(null);   
        }, 5000);
        msgObject.channel.send(`Goodbye ${vMembers[0].user.username}`)
    }


}
