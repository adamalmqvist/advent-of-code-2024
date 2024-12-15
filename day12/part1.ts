const rawFile = await Deno.readTextFile("input.txt");
const rows = rawFile.split(/\n/);
const grid = [];
for (const row of rows) {
    grid.push(row.split(""));
}

const map: { [key: string]: [number[]] } = {};
for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        const cell = grid[i][j];
        if (map[cell]) {
            map[cell].push([i, j]);
        } else {
            map[cell] = [[i, j]];
        }
    }
}
function areNeighbors(point1: number[], point2: number[]): boolean {
    const [x1, y1] = point1;
    const [x2, y2] = point2;

    return (
        (x1 === x2 && Math.abs(y1 - y2) === 1) || 
        (y1 === y2 && Math.abs(x1 - x2) === 1)   
    );
}
const groupedLetterCoordinates: {[key: string]: number[][][]}= {};

for (const [letter, coords] of Object.entries(map)) {
    const coordinateGroups = [];
    const remainingCoords = new Set(coords.map(coord => coord.join(',')));

    while (remainingCoords.size > 0) {
        const startCoord = Array.from(remainingCoords)[0].split(',').map(Number);
        const currentGroup = [startCoord];
        remainingCoords.delete(startCoord.join(','));

        let added;
        do {
            added = false;
            for (const existingCoord of currentGroup) {
                for (const remainingCoordStr of Array.from(remainingCoords)) {
                    const remainingCoord = remainingCoordStr.split(',').map(Number);
                    if (areNeighbors(existingCoord, remainingCoord)) {
                        currentGroup.push(remainingCoord);
                        remainingCoords.delete(remainingCoordStr);
                        added = true;
                    }
                }
            }
        } while (added);

        coordinateGroups.push(currentGroup);
    }

    groupedLetterCoordinates[letter] = coordinateGroups;
}

function calculatePerimeterAndArea(grid: number[][]) {
    if (!grid || grid.length === 0) return { perimeter: 0, area: 0 };

    const points = new Set(grid.map(point => point.toString()));

    let perimeter = 0;
    const area = grid.length;

    const neighbors = [
        [0, 1], 
        [0, -1], 
        [1, 0], 
        [-1, 0]  
    ];

    for (const [x, y] of grid) {
        for (const [dx, dy] of neighbors) {
            const neighbor = [x + dx, y + dy].toString();
            if (!points.has(neighbor)) {
                perimeter++;
            }
        }
    }

    return { perimeter, area };
}

let res = 0;
for (const key in groupedLetterCoordinates) {
    for (const group in groupedLetterCoordinates[key]) {
        const {area, perimeter} = calculatePerimeterAndArea(groupedLetterCoordinates[key][group]);
        res += area * perimeter;
    }
}
console.log("res", res);
