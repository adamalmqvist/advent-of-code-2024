const rawFile = await Deno.readTextFile("input.txt");
const rows = rawFile.split(/\n/);
const height = rows.length;
const width = rows[0].length;

const antennaPositions: Record<string, [number, number][]> = {};
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        const char = rows[y][x];
        if (char !== ".") {
            if (!antennaPositions[char]) {
                antennaPositions[char] = [];
            }
            antennaPositions[char].push([x, y]);
        }
    }
}

const antinodePositions = new Set<string>();

for (const [, positions] of Object.entries(antennaPositions)) {
    if (positions.length < 2) continue;

    for (const [x, y] of positions) {
        antinodePositions.add(`${x},${y}`);
    }

    for (let i = 0; i < positions.length; i++) {
        const [x1, y1] = positions[i];
        for (let j = i + 1; j < positions.length; j++) {
            const [x2, y2] = positions[j];

            const dx = x2 - x1;
            const dy = y2 - y1;

            let k = 1;
            while (true) {
                const xNew = x1 - k * dx;
                const yNew = y1 - k * dy;
                if (xNew >= 0 && xNew < width && yNew >= 0 && yNew < height) {
                    antinodePositions.add(`${xNew},${yNew}`);
                } else {
                    break;
                }
                k++;
            }

            k = 1;
            while (true) {
                const xNew = x2 + k * dx;
                const yNew = y2 + k * dy;
                if (xNew >= 0 && xNew < width && yNew >= 0 && yNew < height) {
                    antinodePositions.add(`${xNew},${yNew}`);
                } else {
                    break;
                }
                k++;
            }
        }
    }
}

console.log(antinodePositions.size);
