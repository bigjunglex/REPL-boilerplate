import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"
import { commandMap, commmandMapb } from "./command_map.js"
import { commandExplore } from "./command_explore.js"
import { commandCatch } from "./command_catch.js"
import { commandInspect } from "./command_inspect.js"
import type { CLIcommand } from "./state.js"
import { commandPokedex } from "./command_pokedex.js"


function getCommands():Record<string, CLIcommand> {
    return {
        exit: {
            name: 'exit',
            description: 'Exit the Pokedex',
            callback: commandExit,
        },
        help: {
            name: 'help',
            description: 'Displays a help message',
            callback: commandHelp,
        },
        map: {
            name: 'map',
            description: 'Display next 20 locations',
            callback: commandMap,
        },
        mapb: {
            name: 'mapb',
            description: 'Display previous 20 locations',
            callback: commmandMapb
        },
        explore: {
            name: 'explore',
            description: 'Explore location and its pokemons',
            callback: commandExplore
        },
        catch: {
            name: 'catch',
            description: 'Take a chance to catch pokemon',
            callback: commandCatch
        },
        inspect: {
            name: 'inscpect',
            description: 'Inspect caught pokemons',
            callback: commandInspect
        },
        pokedex: {
            name: 'pokedex',
            description: 'Display list of caught pokemons',
            callback: commandPokedex   
        }
    }
}


export { getCommands }






