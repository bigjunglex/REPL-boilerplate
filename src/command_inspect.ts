import { State } from "./state";

export async function commandInspect(state:State, ...args:string[]) {
    const { readline, pokedex } = state
    const pokemon = args[0];
    let out = [];

    if(!pokedex[pokemon]) {
        console.log('%s is not caught yet', pokemon)
        readline.prompt()
        return;
    }

    const data = await state.api.fetchPokemon(pokemon)

    console.log('Name: %s', data.name)
    console.log('Height: %d', data.height)
    console.log('Weight: %d', data.weight)
    console.log('Stats: ')
    for (const stat of data.stats) {
        console.log('  -%s: %d', stat.stat.name, stat.base_stat)
    }
    console.log('Types: ')
    for (const type of data.types) {
        console.log('  -%s', type.type.name)
    }

    readline.prompt()
}