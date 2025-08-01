import type { State } from "./state";

function cleanInput(input:string):string[] {
    return input.toLowerCase().split(' ').filter(i => i.length > 0)
}

async function startREPL(state:State):Promise<void> {
    const rl = state.readline
    const commands = state.commands

    rl.prompt()
    rl.on('line', (str) => {
        const washed = cleanInput(str);
        const cmd = washed[0] || null
        
        if(cmd) {
            if (commands[cmd]) {
                try {
                    commands[cmd].callback(state, ...washed.slice(1))
                } catch (e){ 
                    console.log(e)
                }
            } else {
                console.log('Unknow command %s', cmd)
            }             
        }

        rl.prompt()
    })
}



export { cleanInput, startREPL }