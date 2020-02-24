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


        if(args[0]==="w" || args[0]==="week" || args[0]==="weekly"){
            this.getWeekly(msgObject)
        }

        if(args[0]==="c" || args[0]==="champ" || args[0]==="champion"){    
            
            //check if name is on list first.
            if(args[1]==="r" || args[1]==="rand" || args[1]==="random"){
                this.getChampion(msgObject,getChampInfo((Math.floor(Math.random() * lolconfig.lolcfg.champs.length))).name,client);
             }else{
                this.getChampion(msgObject,args[1], client);
             }
        }
    }

    async getChampion(msgObject:Discord.Message, args:string, client:Discord.Client ){
        //Get champion object from lolcfg api
        let champ = lolconfig.lolcfg.champs.find(elem=>elem.name===args);
        let cType = "";
        //style it
        const lolEmbed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(`${client.user.username}`, `${client.user.avatarURL}`, 'https://discord.js.org')
        .setTitle(`${champ.title}, ${champ.name}`)
        .setURL(`https://leagueoflegends.fandom.com/wiki/${champ.name}`)
        .setDescription(``)
        .setThumbnail('https://venturebeat.com/wp-content/uploads/2019/09/league-of-legends.jpg?w=1200&strip=all')
        .addField('Lore', `${champ.blurb}`)
        .addField('Difficulty', `${champ.info.difficulty}/10`, true)
        .setImage(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.name}_0.jpg`)
        .setTimestamp()
        .setFooter(`League of legends champ requested by ${msgObject.author.username}`, `${msgObject.author.avatarURL}`);

        champ.tags.forEach(e => {
            cType += e + ", ";
        })

        lolEmbed.addField('Role', cType, true);
        msgObject.channel.send(lolEmbed);  
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