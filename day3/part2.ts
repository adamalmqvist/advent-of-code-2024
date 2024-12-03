const rawFile = await Deno.readTextFile("input.txt")


const extractMulCalls = (inputString: string) => {
    const mulRegex = /mul\((\d+,\d+)\)/g;
    const matches = inputString.match(mulRegex);
    return matches || [];
}
const extractParentheses = (inputList: string[]) => {
    const matches = []
    const parentheses  = /\(([^)]+)\)/g
    for (const input of inputList) {
        const match = input.match(parentheses);
        if (match) {
            matches.push(match[0])
        }
    }
    return matches.map(x => x.replace(/[()]/g, "").split(','))
}

const removeBetweenDontAndDo = (inputString: string) => {
    const parts = inputString.split('don\'t()');
    let output = parts[0];
  
    for (let i = 1; i < parts.length; i++) {
      const part = parts[i];
      const doIndex = part.indexOf('do()');
      if (doIndex !== -1) {
        output += part.substring(doIndex + 4);
      }
    }
  
    return output;
}
const extractedMuls = removeBetweenDontAndDo(rawFile)
const muls = extractMulCalls(extractedMuls)
const operations = extractParentheses(muls)
const result = operations.reduce((partialSum, a) => partialSum + (Number(a[0]) * Number(a[1]) ), 0);
console.log(result)