class PokeAPI {
    private static readonly baseURL = 'https://pokeapi.co/api/v2';

    constructor() {}

    async fetchLocations(pageURL?:string | null): Promise<ShallowLocations> {
        const url = pageURL || PokeAPI.baseURL + '/location-area'
        let out;
        try {
            const res = await fetch(url)
            const data = await res.json()
            out = data
        } catch (error) {
            console.log(error)
        }

        return out as ShallowLocations
    }

    async fetchLocation(locationName:string): Promise<Location> {
        const url = PokeAPI.baseURL + `/location/${locationName}`
        let out;
        try {
            const res = await fetch(url)
            const data = await res.json()
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