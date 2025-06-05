import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"
import { commandMap, commmandMapb } from "./command_map.js"
import type { CLIcommand } from "./state.js"

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
        }
    }
}



export { getCommands }






