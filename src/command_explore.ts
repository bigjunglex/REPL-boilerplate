import { State } from "./state";


export async function commandExplore(state:State, ...args:string[]) {
    const { readline } = state;
    const location = args[0];
    console.log('Exploring %s...', location)
    
    const data = await state.api.fetchLocation(location);
    const list = data.pokemon_encounters.map(encounter => encounter.pokemon.name);
    
    console.log('Found Pokemon:')
    for (const pokemon of list) {
        console.log(`  - ${pokemon}`)
    }
    
    readline.prompt()
}