import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import * as Token from "./token";
import { IBotCommand } from "./api";

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

let statDesc=[
    "Sona jungla",
    "Under Development",
    "Unas cachimbitas para cenar",
    "Ustedes son pareja?"
]

let pressStat = [
    "dnd",
    "online",
    "idle"
]

//This runs once the bot is online
client.on("ready", ()=>{
    //Set description

    setActivity();
    
    function setActivity() {
        client.user.setActivity(statDesc[Math.floor(Math.random()*statDesc.length)], {type: "PLAYING"});
        client.user.setStatus((pressStat[Math.floor(Math.random()*pressStat.length)] as Discord.PresenceStatus))
        setTimeout(setActivity, 10000);
    }
    
    console.log("Bot is OK");
})

//Every time that the bot is online and any message is written in the server it will do this:
client.on("message", msg => {
    //Ignore the mgs is it was sent by the bot
    if(msg.author.bot){return;}
    //Ignore DMs DUH!
    if(msg.channel.type=="dm"){return;}
    //Ignore msgs that starts with prefix
    if(!msg.content.startsWith(ConfigFile.config.prefix)){return;}
    //Handle command
    handleCommands(msg);
})

async function handleCommands(msg: Discord.Message){
    //Split string ito command and args
    let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "").toLocaleLowerCase();
    let args = msg.content.split(" ").slice(1);
    //Check trough all of our loaded commands
    for(const commandClass of commands){
        //attemp to exec code but ready in case of possible error
        try{
            //Check command class if its coorrect one
            if(!commandClass.isThisCommand(command)){
                //Go to next iterations of the loop if it isnt the correct command class
                continue;
            }
            //Pause exec whils we run command code
            await commandClass.runThisCommand(args,msg,client);
        }catch(exception){
            //If there is a error. Log it.
            //console.log(exception);
        }
    }
}

function loadCommands(commandsPath: string) {
    //Check for commands
    if (!ConfigFile.config || ConfigFile.config.commands.length === 0) {
        return;
    }
    //Load every command
    for (const commandName of ConfigFile.config.commands) {
        const commandClass = require(`${commandsPath}/${commandName}`).default;
        const command = new commandClass();
        commands.push(command);
    }
}

client.login(Token.token);
