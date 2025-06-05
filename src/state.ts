import { createInterface, type Interface } from "readline"
import { stdin as input, stdout as output } from "node:process"
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeapi.js";
import { aP } from "vitest/dist/chunks/reporters.d.C-cu31ET.js";

type CLIcommand = {
    name:string;
    description: string;
    callback: (state: State ) => Promise<void>;
}

type State = {
    readline: Interface;
    commands: Record<string, CLIcommand>;
    api: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
}

function initState():State {
    const rl = createInterface({input, output, prompt: '🗿:'})
    const commands = getCommands()
    const api = new PokeAPI()

    return {
        readline: rl,
        commands: commands,
        api: api,
        nextLocationsURL: '',
        prevLocationsURL: '',
    }
}


export { CLIcommand, State, initState }