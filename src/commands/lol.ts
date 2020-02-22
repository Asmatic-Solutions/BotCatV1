import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as lolconfig from "../lolconfig";
const axios = require('axios').default;

export default class lol implements IBotCommand{
 
    private readonly _command = "lol"

    help(): string{
        return "weekly lol thingy";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ){
        this.getWeekly(msgObject)
        // msgObject.channel.send(``);  
    }

    
    async getWeekly(msgObject: Discord.Message){
        const api = "https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" + lolconfig.lolcfg.api;
        let champions: any[] = [];
        let lolString = "";
        await axios.get(api).then((response: any) => {
             response.data.freeChampionIds.forEach((id: any) => {  
                    champions.push(getChampInfo(id));
                })
        })

        const lolEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle('Free champion rotations')
        .setThumbnail('https://venturebeat.com/wp-content/uploads/2019/09/league-of-legends.jpg?w=1200&strip=all');

        champions.forEach(elem=>{
            lolEmbed.addField(elem.name, elem.title, true)
        })

        msgObject.channel.send(lolEmbed);  


    }
}

function getChampInfo(id:any){
    return lolconfig.lolcfg.champs.find(Element => Element.key == id);
    //Find id in champs array. Then return champ obj
}



