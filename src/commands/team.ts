import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { userInfo } from "os";
import { stringify } from "querystring";

export default class hello implements IBotCommand{

    private readonly _command = "team";

    help(): string{
        return "Am I Online command";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):void{
        
   
        //Set up the mentions
        let members = new Array;
        msgObject.mentions.users.forEach(element => {members.push(element)});
        let team2 = new Array;
        //Shuffle array
        members.sort(() => Math.random() - 0.5);
        //Take half of the array away
   
        team2 = members.splice(0,Math.ceil(members.length/2))

        const t1Embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`Team 1`)
        .setDescription(`${teambuilder(members)}`);

        const t2Embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`Team 2`)
        .setDescription(`${teambuilder(team2)}`);
        

        msgObject.channel.send(t1Embed);
        msgObject.channel.send(t2Embed);


    }
}

function teambuilder(team = new Array) {

    let teamnames =" ";
    for(let x=0;x<team.length;x++)
    {
     teamnames += team[x].username + "\n";
    }
    return teamnames;    
}