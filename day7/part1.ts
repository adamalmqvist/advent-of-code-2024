const rawFile = await Deno.readTextFile("input.txt")
const rows = rawFile.split(/\n/).map((item) => {
    const [target, values] = item.split(':')
    return {target: Number(target) , values: values.trim().split(' ').map((number) => Number(number))}
})

type Operator = '+' | '*';
const operators = ['+', '*'];

const generateCombinations  =  ( length: number): Operator[][] => {
    if (length === 0) {
        return [[]];
    }

    const combinations: Operator[][] = [];
    const subCombinations = generateCombinations( length - 1);

    for (const op of operators) {
        for (const subComb of subCombinations) {
            combinations.push([op as Operator, ...subComb]);
        }
    }

    return combinations;
}


const evaluateExpression  = (numbers: number[], operators: Operator[]) => {
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += numbers[i + 1];
        } else if (operators[i] === '*') {
            result *= numbers[i + 1];
        }
    }
    return result;
}

const findTargetValue = (numbers: number[], target: number) => {
    const numOperators = numbers.length - 1;
    const combinations = generateCombinations( numOperators);

    for (const combination of combinations) {
        const result = evaluateExpression(numbers, combination);
        if (result === target) {
            return true;
        }
    }
    return false;
}

const possbleEquations = []
for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const {target, values} = row
    const isPossible = findTargetValue(values ,target)
    if (isPossible) {
        possbleEquations.push(target)
    }

  }

const result = possbleEquations.reduce((num, acc) => num + acc, 0)

console.log(result)