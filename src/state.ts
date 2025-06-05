import { createInterface, type Interface } from "readline"
import { stdin as input, stdout as output } from "node:process"
import { getCommands } from "./command.js";

type CLIcommand = {
    name:string;
    description: string;
    callback: (state: State ) => void;
}

type State = {
    readline: Interface;
    commands: Record<string, CLIcommand>;
}

function initState():State {
    const rl = createInterface({input, output, prompt: '🗿:'})
    const commands = getCommands()

    return {
        readline: rl,
        commands: commands,
    }
}


export { CLIcommand, State, initState }