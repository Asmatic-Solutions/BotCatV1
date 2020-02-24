import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class unmute implements IBotCommand{

    private readonly _command = "unmute";

    help(): string{
        return "random disconnect";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):void{
        /**  
         * Important
         * vMembers is of type guildMember
         * GuildMember contains ClientUser, which is the type of data
         * That mentions uses
         * 
         * IF WE want to use that if not find diff way
         *
         * After getting the mentioned user, check for the mentioned channel and then 
         * do a vMember on the index of the mentioned user to the mentioned voice channel targeting guildmember
         * X number of times.
         * **/

         /** Things to consider
          * 
          * Evaluate what is faster and what takes less memory, then see if we wanta big program or a slow one
          * :Make 2 vars to store Guildmember and 
          * 
          * If we can check for Object.keys maybe it will work
          * 
          * We can convert guildmember with a foreach to get the clientuser
          */

        let vMembers = new Array;
        let vMembs = new Array;
        
        //Fetch all voice channel users
        //Takes every guildMember of the "member collection" and puts it into an array - Basically taking the members out of a very ugly data structure
        for (let[snowflake, guildMember] of msgObject.member.voiceChannel.members){
            if(guildMember.deaf){
                vMembers.push(guildMember.user);
                vMembs.push(guildMember);
            }
        }
        //Check if theres someone muted in the channel
        if(vMembers.length==0){
            msgObject.channel.send("No one is muted in the voice channel");
            return;
        }
        //check if mentioned user is in the same voie channel
        if(vMembers.indexOf(msgObject.mentions.users.array()[0]) == -1){
            msgObject.channel.send("Member must be in the same voice channel");
            return;
        }

        //Set up an interval to run every second, moving the target back and forth. Interval is breaken if user unmutes himself
        let intervalID = setInterval(() => {              
            if(vMembs[vMembers.indexOf(msgObject.mentions.users.array()[0])].selfDeaf){
                vMembs[vMembers.indexOf(msgObject.mentions.users.array()[0])].setVoiceChannel(msgObject.guild.afkChannel);
                vMembs[vMembers.indexOf(msgObject.mentions.users.array()[0])].setVoiceChannel(msgObject.member.voiceChannel);
            }else{
                clearInterval(intervalID);
            }
        }, 1000);

        //For 10 seconds it will check if the user has unmuted himself or not, after that it will be either failure or nay.
        let timeoutID = setTimeout(() => {
            clearInterval(intervalID);
            if(!(vMembs[vMembers.indexOf(msgObject.mentions.users.array()[0])].selfDeaf)){
                console.log("succes");
                msgObject.channel.send(`Succesfully unmuted ${msgObject.mentions.users.array()[0].username} by the request of ${msgObject.author.username}`);
                clearTimeout(timeoutID);
            }else{
                msgObject.channel.send(`Couldn't unmute ${msgObject.mentions.users.array()[0].username} by the request of ${msgObject.author.username}`);
            }
        }, 10000);
    }
    
}








