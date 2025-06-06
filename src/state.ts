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
    return {
        readline: createInterface({input, output, prompt: '🗿:'}),
        commands: getCommands(),
        api: new PokeAPI(),
        nextLocationsURL: '',
        prevLocationsURL: '',
        pokedex: {},
    }
}


export { CLIcommand, State, initState }