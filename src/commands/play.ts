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
 
        //make more checks.......

        if(queue.length>1){
            let videoInf:any;
            ytdl.getInfo(args[0], (err:any,info:any) => {
                videoInf = info.player_response.videoDetails;
                console.log(videoInf.title);
                const pEmbed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor(`Adding to current queue `, client.user.avatarURL)
                .setTitle(`${videoInf.title}`)
                .setDescription("")
                .setURL(queue[0])
                .addField("Duration", `${videoInf.lengthSeconds} Seconds`, true)
                .addField("Current list", queue.length, true)
                .setTimestamp()
                .setFooter(`Added by ${msgObject.author.username}`, msgObject.author.avatarURL);
            msgObject.channel.send(pEmbed);
            });
        }

        if (msgObject.guild.voiceConnection.speaking == false) {
            playUrl(args, msgObject, client);
        }
        msgObject.delete(5000)
            .catch(err=>console.log(err));
    }
}


function playUrl(args: string[], msgObject:Discord.Message, client:Discord.Client){
    const stream = ytdl(queue[0], { filter : 'audioonly' });
    let videoInf : any;
    ytdl.getInfo(queue[0], (err:any,info:any) => {
        // console.log(info.player_response.videoDetails); Check for reference
        videoInf = info.player_response.videoDetails;
    });
    msgObject.guild.voiceConnection.playStream(stream)
        .on("start",()=>{
            // msgObject.channel.send(`Now playing, current list ${queue.length}`);
            const pEmbed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setAuthor(`Now playing`, client.user.avatarURL)
                .setTitle(`${videoInf.title}`)
                .setDescription("")
                .setURL(queue[0])
                .addField("Duration", `${videoInf.lengthSeconds} Seconds`, true)
                .addField("Current list", queue.length, true)
                .setTimestamp()
                .setFooter(`Requested by ${msgObject.author.username}`, msgObject.author.avatarURL);
            msgObject.channel.send(pEmbed);
        })
        .on("end", () => {
            queue.shift();
            queue.length>1?playUrl(args,msgObject,client):msgObject.channel.send("No more songs in current playlist");
            //This event shifts the queue to play the next song!
        }).on("error",error => {
            console.log("Error @ play url", error);
        });
}

/** 
 * Top takes priority if marked with ! is crucial more is more crucial (duh https://www.youtube.com/watch?v=d9hA3c2vtQw)
 * 
 * Order of priority in logic/operational to implement features more easily
 * Add a Switch statement for all the cases !!
 * Add more Args[0] validations
 * Dive into 
 * 
 * 
 * Order of priority in bug solving
 * !Fix the sometimes ocurring bug that makes the bot to stop playing bc Cannot read property 'title' of undefined (play long enough and youll find it)!!!!!!!!!!!!!!!!!!!!!
 * 
 * 
 * 
 * Order of priority in feature implementations
 * Add Clear queue
 * Add Skip current
 * Add aliases !p (ie)
 * If its not a URL make a youtube fetch to get the first video in a search for taht string.
 *
 * 
 */