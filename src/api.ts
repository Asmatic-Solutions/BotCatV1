import * as Discord from "discord.js"

export interface IBotCommand{
    help(): string;
    isThisCommand(command:string):boolean;
    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):void;
}