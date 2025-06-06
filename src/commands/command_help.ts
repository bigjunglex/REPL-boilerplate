import type { State } from "../state";

export async function commandHelp(state:State):Promise<void> {
    const commands = state.commands

    console.log('Welcome to the Pokedex!')
    console.log('Usage:\n\n')
    for (const key of Object.keys(commands)) {
        const c = commands[key];
        console.log(`${c.name} : ${c.description}`)
    }
}