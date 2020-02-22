import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class isoncommand implements IBotCommand{

    private readonly _command = "isoncommand";

    help(): string{
        return "Am I Online command";
    }

    isThisCommand(command:string): boolean{
        return command === this._command;
    }

    runThisCommand(args: string[], msgObject: Discord.Message, client:Discord.Client ):void{
    }


}