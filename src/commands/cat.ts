import * as Discord from "discord.js";
import {IBotCommand} from "../api";
const superagent = require("superagent")

export default class cat implements IBotCommand{

    private readonly _command = "cat"

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
     
        const { body } = await superagent
        .get('http://aws.random.cat/meow');
        const catEmbed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle(`Cat requested by ${msgObject.author.username}`)
            .setImage(body.file)
            .setFooter("Powered by https://docs.duncte123.com/");
        msgObject.channel.send(catEmbed)
    }


}




