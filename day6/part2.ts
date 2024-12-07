const rawFile = await Deno.readTextFile("input.txt");

const findStartingPosition = (rows: string[]): [number, number] => {
    const width = rows[0].length;
    const height = rows.length;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (rows[y][x] === "^") {
                return [x, y];
            }
        }
    }
    throw new Error("No starting position found");
};

const calculateJumpDestination = (
    rows: string[],
    x: number,
    y: number,
    dindex: number,
): [number, number, number | null] | null => {
    const width = rows[0].length;
    const height = rows.length;
    const directions: [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    if (rows[y][x] === "#") return null;

    const [dx, dy] = directions[dindex];
    while (x >= 0 && y >= 0 && x < width && y < height && rows[y][x] !== "#") {
        x += dx;
        y += dy;
    }

    if (x < 0 || y < 0 || x >= width || y >= height) {
        return [x, y, null];
    }

    x -= dx;
    y -= dy;
    dindex = (dindex + 1) % 4;
    return [x, y, dindex];
};

const solveGuardPatrol = (input: string): number => {
    const rows = input.trim().split("\n").map((line) => line.trim());
    const width = rows[0].length;
    const height = rows.length;

    const [sx, sy] = findStartingPosition(rows);

    const directions: [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    const directionMap: Record<string, [number, number]> = {
        ">": [1, 0],
        "<": [-1, 0],
        "^": [0, -1],
        "v": [0, 1],
    };

    const createJumpMap = (): Record<
        string,
        [number, number, number | null] | null
    > => {
        const map: Record<string, [number, number, number | null] | null> = {};
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                for (let di = 0; di < directions.length; di++) {
                    map[`${x},${y},${di}`] = calculateJumpDestination(
                        rows,
                        x,
                        y,
                        di,
                    );
                }
            }
        }
        return map;
    };

    const jumpMap = createJumpMap();

    const calculateJumpWithBlockPatch = (
        x: number,
        y: number,
        dindex: number,
        blockPatch?: [number, number],
    ): [number, number, number | null] | null => {
        const dest = jumpMap[`${x},${y},${dindex}`];
        if (blockPatch && dest) {
            const [fx, fy] = dest;
            const [bx, by] = blockPatch;
            if (fx === bx && Math.min(y, fy) <= by && by <= Math.max(y, fy)) {
                return jumpIntoBlock(dindex, blockPatch);
            }
            if (Math.min(x, fx) <= bx && bx <= Math.max(x, fx) && fy === by) {
                return jumpIntoBlock(dindex, blockPatch);
            }
        }
        return dest;
    };

    const jumpIntoBlock = (
        dindex: number,
        blockPatch: [number, number],
    ): [number, number, number | null] => {
        const [dx, dy] = directions[dindex];
        const [bx, by] = blockPatch;
        return [bx - dx, by - dy, (dindex + 1) % 4];
    };

    const findPathLoop = (blockPatch?: [number, number]): boolean => {
        let x = sx, y = sy;
        let dindex: number | null = directions.findIndex((d) =>
            d[0] === directionMap[rows[y][x]][0] &&
            d[1] === directionMap[rows[y][x]][1]
        );

        const visited = new Set<string>();

        while (true) {
            const jumpResult = calculateJumpWithBlockPatch(
                x,
                y,
                dindex,
                blockPatch,
            );
            if (!jumpResult) return false;

            [x, y, dindex] = jumpResult;
            if (dindex === null) return false;

            const key = `${x},${y},${dindex}`;
            if (visited.has(key)) return true;
            visited.add(key);
        }
    };

    let loopPositions = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if ((x !== sx || y !== sy) && rows[y][x] !== "#") {
                if (findPathLoop([x, y])) {
                    loopPositions++;
                }
            }
        }
    }

    return loopPositions;
};

const result = solveGuardPatrol(rawFile);
console.log(result);
