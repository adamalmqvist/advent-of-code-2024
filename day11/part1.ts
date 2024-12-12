const rawFile = await Deno.readTextFile("input.txt");

let numbers = rawFile
    .split(" ")
    .map(Number);

for (let iteration = 0; iteration < 25; iteration++) {
    const nextNumbers = [];
    
    for (const num of numbers) {
        
        if (num === 0) {
            nextNumbers.push(1);
        } else {
            const numStr = num.toString();

            if (numStr.length % 2 === 0) {
                const midpoint = numStr.length / 2;
                const leftStone = Number(numStr.substring(0, midpoint));
                const rightStone = Number(numStr.substring(midpoint));
                nextNumbers.push(leftStone , rightStone);
            } else {
                nextNumbers.push(num * 2024);
            }
        }
    }
    numbers = nextNumbers;
}
console.log('numbers.length', numbers.length)
