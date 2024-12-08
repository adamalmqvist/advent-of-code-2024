const rawFile = await Deno.readTextFile("input.txt");
const rows = rawFile.split(/\n/);
const grid = [];
for (const row of rows) {
    grid.push(row.split(""));
}
const resultGrid = structuredClone(grid);
const antinodeSet = new Set();

const findAllExceptSelf = (
    self: { x: number; y: number },
    target: string,
    grid: string[][],
) => {
    const result: { x: number; y: number }[] = [];
    for (let x = 0; x < grid.length; x++) {
        const row = grid[x];
        for (let y = 0; y < row.length; y++) {
            const num = row[y];
            if (self.x === x && self.y === y) {
                continue;
            }
            if (num === target) {
                result.push({ x: x, y: y });
            }
        }
    }
    return result;
};

for (let x = 0; x < grid.length; x++) {
    const row = grid[x];
    for (let y = 0; y < row.length; y++) {
        const num = row[y];
        if (num !== ".") {
            const occurrences = findAllExceptSelf(
                {
                    x: x,
                    y: y,
                },
                num,
                grid,
            );
            for (let i = 0; i < occurrences.length; i++) {
                const occurrence = occurrences[i];
                const xDistance = occurrence.x - x;
                const yDistance = occurrence.y - y;
                const newX1 = x - xDistance;
                const newY1 = y - yDistance;
                const newX2 = occurrence.x + xDistance;
                const newY2 = occurrence.y + yDistance;

                if (isWithinBounds({ x: newX1, y: newY1 }, grid)) {
                    antinodeSet.add(`${newX1},${newY1}`);
                    resultGrid[newX1][newY1] = "#";
                }
                if (isWithinBounds({ x: newX2, y: newY2 }, grid)) {
                    antinodeSet.add(`${newX2},${newY2}`);
                    resultGrid[newX2][newY2] = "#";
                }
            }
        }
    }
}

function isWithinBounds(point: { x: number; y: number }, grid: string[][]) {
    return point.x >= 0 && point.x < grid.length && point.y >= 0 &&
        point.y < grid[0].length;
}

console.log(antinodeSet.size);
