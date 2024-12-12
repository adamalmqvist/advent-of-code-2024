const rawFile = await Deno.readTextFile("input.txt");

const numbers = rawFile
    .split(" ")
    .map(Number);

const cache = new Map();

const blink = (number: number, blinks: number): number => {
    const cacheKey = `${number}:${blinks}`;
    if (cache.has(cacheKey)) return cache.get(cacheKey);

    if (blinks === 0) return 1;

    if (number === 0) {
        const result = blink(1, blinks - 1);
        return cache.set(cacheKey, result), result;
    }

    const stoneString = number.toString();
    if (stoneString.length % 2 === 0) {
        const middle = stoneString.length / 2;
        const result = blink(Number(stoneString.slice(0, middle)), blinks - 1)
            + blink(Number(stoneString.slice(middle)), blinks - 1);
        return cache.set(cacheKey, result), result;
    }

    const result = blink(number * 2024, blinks - 1);
    return cache.set(cacheKey, result), result;
};

const totalBlinks = 75;
let total = 0;
for (const number of numbers) {
    total += blink(number, totalBlinks);
}

console.log('total', total);
