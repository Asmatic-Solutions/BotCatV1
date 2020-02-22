import * as Discord from "discord.js";
import {IBotCommand} from "../api";
const superagent = require("superagent")
const randomPuppy = require('random-puppy');
 

export default class nsfw implements IBotCommand{

    private readonly _command = "nsfw"

    help(): string{
        return "random meme from the web";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ){
        let numberOfItems = Number(args[0]);
        if (!numberOfItems) {
            this.runASync(args,msgObject,client);
            return;
        }
        if (isNaN(numberOfItems)) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but ${msgObject.content.split(" ").slice(1)} is not a valid number`);
            return;
        }
        if(numberOfItems>5){
            msgObject.channel.send(`Only 5 ${this._command}s at a time please!`)
            return;
        }
        for(let x=0;x<numberOfItems;x++){this.runASync(args,msgObject,client);}
    }

    async runASync(args: string[], msgObject: Discord.Message, client:Discord.Client ){
     
        const img = await randomPuppy("Nsfw_Amateurs")

        
        const memeEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription(`From: r/nsfw`)
        .setImage(img);
        
        
        msgObject.channel.send(memeEmbed)
    }


}