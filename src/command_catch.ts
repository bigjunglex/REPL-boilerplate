import { State } from "./state";

const randomize = (baseExp: number) => {
    const base = 0.5;
    const dropRate = 0.0004;
    const chance = base * Math.exp(-dropRate * (baseExp - 50))
    return Math.random() < chance
}

export async function commandCatch(state:State, ...args:string[]) {
    const { readline } = state;
    const pokemon = args[0];
    console.log('Throwing a Pokeball at %s...', pokemon);
    try {
        const data = await state.api.fetchPokemon(pokemon);
        const res = randomize(data.base_experience) ? 'was caught!' : 'escaped!'
        if (res) state.pokedex[data.name] = data;

        console.log('%s %s', pokemon, res)
        
    } catch (error) {
        console.log('Unknow pokemon')
    }


    readline.prompt()
}
