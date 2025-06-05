import type { CLIcommand } from "./command";

export function commandHelp(commands: Record<string, CLIcommand>) {
    console.log('Welcome to the Pokedex!')
    console.log('Usage:\n\n')
    for (const key of Object.keys(commands)) {
        const c = commands[key];
        console.log(`${c.name} : ${c.description}`)
    }
}