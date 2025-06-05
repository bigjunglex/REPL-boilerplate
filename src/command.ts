import { commandExit } from "./command_exit.js"
import { commandHelp } from "./command_help.js"
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
        }
    }
}



export { getCommands }






