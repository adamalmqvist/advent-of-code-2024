const rawFile = await Deno.readTextFile("input.txt")


const extractMulCalls = (inputString: string) => {
    const mulRegex = /mul\((\d+,\d+)\)/g;
    const matches = inputString.match(mulRegex);
    return matches || [];
}
const extractParanteses = (inputList: string[]) => {
    const matches = []
    const parantestes  = /\(([^)]+)\)/g
    for (const input of inputList) {
        const match = input.match(parantestes);
        if (match) {
            matches.push(match[0])
        }
    }
    return matches.map(x => x.replace(/[()]/g, "").split(','))
}
const muls = extractMulCalls(rawFile)
const operations = extractParanteses(muls)
const result = operations.reduce((partialSum, a) => partialSum + (Number(a[0]) * Number(a[1]) ), 0);
console.log(result)