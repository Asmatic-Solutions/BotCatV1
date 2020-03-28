import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import { chown } from "fs";
const superagent = require("superagent")

export default class temp implements IBotCommand{

    private readonly _command = "temp"

    help(): string{
        return "make a temp voice chanel";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    async runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):Promise<void>{
        if (!msgObject.member.roles.some(role => role.name === 'Maker')) {
            msgObject.channel.send(`You are an ape`);
            return;
        }
        
            const chn = await msgObject.guild.createChannel(`Temp${msgObject.author.username.toString()}`,{type: 'voice'});
            await chn.setParent('680124240141484042');// get category;
            msgObject.channel.send(`Canal operativo: ${msgObject.author.username.toString()}`);//return 
        
            /**
             * Illo que no tira esto
             * Dile al pavo que haga un interval
             * Yluego que le de un delete
             * 
             * 
             */

    }
}




