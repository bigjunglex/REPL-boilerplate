function cleanInput(input:string):string[] {
    return input.split(' ').filter(i => i.length > 0)
}


export { cleanInput }