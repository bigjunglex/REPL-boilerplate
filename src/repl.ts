import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process"
import { getCommands } from "./command.js";

function cleanInput(input:string):string[] {
    return input.toLowerCase().split(' ').filter(i => i.length > 0)
}

function startREPL():void {
    const promt = '🗿:'
    const rl = createInterface({ input, output, prompt: promt });
    const commands = getCommands();

    rl.prompt()
    rl.on('line', (str) => {
        const washed = cleanInput(str);
        const cmd = washed[0] || null
        
        if(cmd) {
            if (commands[cmd]) {
                try {
                    commands[cmd].callback(commands)
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