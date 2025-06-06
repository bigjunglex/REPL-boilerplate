import { State } from "../state";

export async function commandPokedex(state:State) {
    const { readline, pokedex } = state;
    const keys = Object.keys(pokedex)
    console.log(`${keys.length > 0 ? 'Your Pokedex: ' : 'Your Pokedex is empty!' }`)

    for (const key of keys) {
        console.log(' - %s', key)
    }

}

