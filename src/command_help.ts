import type { State } from "./state";

export function commandHelp(state:State) {
    const commands = state.commands

    console.log('Welcome to the Pokedex!')
    console.log('Usage:\n\n')
    for (const key of Object.keys(commands)) {
        const c = commands[key];
        console.log(`${c.name} : ${c.description}`)
    }
}