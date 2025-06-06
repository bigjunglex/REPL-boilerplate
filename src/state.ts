import { createInterface, type Interface } from "readline"
import { stdin as input, stdout as output } from "node:process"
import { getCommands } from "./commands/command.js";
import { PokeAPI, Pokemon } from "./api/pokeapi.js";

type CLIcommand = {
    name:string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
}

type State = {
    readline: Interface;
    commands: Record<string, CLIcommand>;
    api: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;
    pokedex: Record<string, Pokemon>;
}

function initState():State {
    const rl = createInterface({input, output, prompt: '🗿:'})
    const commands = getCommands()
    const api = new PokeAPI()
    const pokedex = {};

    return {
        readline: rl,
        commands: commands,
        api: api,
        nextLocationsURL: '',
        prevLocationsURL: '',
        pokedex: pokedex,
    }
}


export { CLIcommand, State, initState }