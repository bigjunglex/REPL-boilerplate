import { read } from "fs";
import { State } from "./state";

export async function commandMap(state:State):Promise<void> {
    const { nextLocationsURL, readline } = state;
    const data = await state.api.fetchLocations(nextLocationsURL || undefined);
    
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;

    const list = data.results.map(area => area.name)
    for (const area of list) {
        console.log('%s', area)
    }
    readline.prompt()
}


export async function commmandMapb(state:State) {
    const { prevLocationsURL, readline } = state;
    if (!prevLocationsURL){
        console.log('You are at the start of the list ')
        readline.prompt();
        return;
    }
    const data = await state.api.fetchLocations(prevLocationsURL);
    
    state.nextLocationsURL = data.next;
    state.prevLocationsURL = data.previous;

    const list = data.results.map(area => area.name)
    for (const area of list) {
        console.log('%s', area)
    }
    readline.prompt()
}