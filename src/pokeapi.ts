import { Cache, type CacheEntry} from "./pokecache.js";

class PokeAPI {
    private static readonly baseURL = 'https://pokeapi.co/api/v2';
    #cache: Cache

    constructor() {
        this.#cache = new Cache(1000) // 5 min - 300000
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
        const url = PokeAPI.baseURL + `/location/${locationName}`
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
    location: {
        name:string;
        url:string;
    }
}


export { PokeAPI, Location, ShallowLocations }