const rawFile = await Deno.readTextFile("input.txt");
const numbers = rawFile.split("\n");

const grid: number[][] = [];
for (const row of numbers) {
    grid.push(row.split("").map(Number));
}

const getPositions = (i: number, j: number, target: number) => {
    const positions = [];
    if (i - 1 >= 0 && grid[i - 1][j] === target) {
        positions.push([i - 1, j]);
    }
    if (i + 1 < grid.length && grid[i + 1][j] === target) {
        positions.push([i + 1, j]);
    }
    if (j - 1 >= 0 && grid[i][j - 1] === target) {
        positions.push([i, j - 1]);
    }
    if (j + 1 < grid[i].length && grid[i][j + 1] === target) {
        positions.push([i, j + 1]);
    }
    return positions;
};
const posSet = new Set();
const findTrails = (i: number, j: number, target = 1) => {
    const positions = getPositions(i, j, target);
    if (positions.length === 0) {
        return null;
    }
    if (target === 9) {
        for (const position of positions) {
            posSet.add(JSON.stringify(position));
        }
        return positions;
    }
    for (const position of positions) {
        findTrails(position[0], position[1], target + 1);
    }
};
const trails = new Map();
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === 0) {
            findTrails(i, j);
            trails.set([i, j], Array.from(posSet));
            posSet.clear();
        }
    }
}
let count = 0;
for (const [, value] of trails) {
    count += value.length;
}
console.log("count", count);
