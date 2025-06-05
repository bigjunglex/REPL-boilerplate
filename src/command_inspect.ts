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
    


}