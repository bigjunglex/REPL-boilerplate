import { Cache, type CacheEntry} from "./pokecache.js";

class PokeAPI {
    private static readonly baseURL = 'https://pokeapi.co/api/v2';
    #cache: Cache

    constructor() {
        this.#cache = new Cache(300000) // 5 min - 300000
    }

    async fetchLocations(pageURL?:string | null): Promise<ShallowLocations> {
        const url = pageURL || PokeAPI.baseURL + '/location-area?offset=0&limit=20'
        let out;
        if (this.#cache.get(url)) {
            return this.#cache.get(url)?.val
        }

        try {
            const res = await fetch(url)
            const data = await res.json()
            const entry:CacheEntry<ShallowLocations> = {
                createdAt: Date.now(),
                val: data
            }
            
            this.#cache.add(url, entry)
            out = data
        } catch (error) {
            console.log(error)
        }

        return out as ShallowLocations
    }

    async fetchLocation(locationName:string): Promise<Location> {
        const url = PokeAPI.baseURL + `/location-area/${locationName}`
        let out;
        if( this.#cache.get(url)) {
            return this.#cache.get(url)?.val
        }

        try {
            const res = await fetch(url)
            const data = await res.json()
            const entry:CacheEntry<Location> = {
                createdAt: Date.now(),
                val: data,
            }

            this.#cache.add(url, entry)
            out = data
        }catch (error) {
            console.log(error)
        }

        return out as Location
    }


    async fetchPokemon(pokemonName:string):Promise<Pokemon> {
        const url = PokeAPI.baseURL + `/pokemon/${pokemonName}`
        let out;
        if( this.#cache.get(url)) {
            return this.#cache.get(url)?.val
        }

        try {
            const res = await fetch(url)
            const data = await res.json()
            const entry:CacheEntry<Pokemon> = {
                createdAt: Date.now(),
                val: data,
            }

            this.#cache.add(url, entry)
            out = data
        }catch (error) {
            console.log('Unknow pokemon')
        }

        return out as Pokemon
    }
}



type ShallowLocations = {
    count: number
    next: string
    previous: string | null;
    results: { name: string; url: string }[]
}

type Location = {
    id: number;
    name: string;
    pokemon_encounters: {
        pokemon: { name:string, url:string }
    }[]
}

type Pokemon = { 
    name:string;
    id:number;
    base_experience: number;
    weight: number;
    height: number;
    stats:{
        base_stat:number;
        stat: {
            name:string;
            url: string;
        }
    }[];
    types: {
        slot: number;
        type: {
            name:string;
            url:string;
        }
    }[];

}
export { PokeAPI, Location, ShallowLocations, Pokemon }

