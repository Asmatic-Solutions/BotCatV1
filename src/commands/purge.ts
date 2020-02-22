import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class purge implements IBotCommand{

    private readonly _command = "purge"

    help(): string{
        return "purge";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):void{
        
        if (!msgObject.member.hasPermission("ADMINISTRATOR")) {
            msgObject.channel.send(`${msgObject.author.username} youre a pleb, not a chad. Admin role is requiered to perform this commands`);
            return;
        }
        if (!args[0]) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} I dont know how many messages I have to delete.`);
            return;
        }
        let numberOfMessagesToDelete =parseInt(args[0]);
        if (isNaN(numberOfMessagesToDelete)) {
            msgObject.channel.send(`Sorry ${msgObject.author.username} but ${msgObject.content.split(" ").slice(1)} is not a valid number`);
            return;
        }
        if (numberOfMessagesToDelete > 100) {
            msgObject.channel.send(`Woaaah ${msgObject.author.username} Chill there! ${msgObject.content.split(" ").slice(1)}, try less than 100 cowboy!`);
            return;
        }
        numberOfMessagesToDelete = Math.round(numberOfMessagesToDelete + 1);
        msgObject.channel.bulkDelete(numberOfMessagesToDelete);
    }
}