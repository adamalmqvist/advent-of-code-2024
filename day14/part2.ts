const rawFile = await Deno.readTextFile("input.txt");

type Robot = {
    x: number;
    y: number;
    vx: number;
    vy: number;
};

type PatternLocation = {
    x: number;
    y: number;
    sum: number;
};

const LENGTH = 103;
const WIDTH = 101;

const parseInputFile = (): Robot[] => {
    const regex = /p=([+-]?\d+),([+-]?\d+) v=([+-]?\d+),([+-]?\d+)/;

    return rawFile
        .split("\n")
        .filter((row) => row.length > 0)
        .map((row) => {
            const match = regex.exec(row);
            if (!match) throw new Error(`Invalid input format: ${row}`);

            return {
                x: Number(match[1]),
                y: Number(match[2]),
                vx: Number(match[3]),
                vy: Number(match[4]),
            };
        });
};

const initializeMatrix = (robots: Robot[]): number[][] => {
    const matrix = Array.from(
        { length: LENGTH },
        () => Array.from({ length: WIDTH }, () => 0),
    );
    robots.forEach((robot) => matrix[robot.y][robot.x]++);
    return matrix;
};

const logMatrix = (matrix: number[][]): void => {
    matrix.forEach((row) => console.log(row.join("").replaceAll("0", ".")));
    console.log("\n");
};

const moveRobot = (matrix: number[][], robot: Robot): void => {
    const { x, y, vx, vy } = robot;
    matrix[y][x]--;

    let toX = x + vx;
    let toY = y + vy;

    toX = toX < 0 ? toX + WIDTH : toX > WIDTH - 1 ? toX - WIDTH : toX;
    toY = toY < 0 ? toY + LENGTH : toY > LENGTH - 1 ? toY - LENGTH : toY;

    matrix[toY][toX]++;

    robot.x = toX;
    robot.y = toY;
};

const detectUnusualPattern = (
    matrix: number[][],
    currentTick: number,
): number => {
    const pattern: PatternLocation[] = [];
    const windowSize = 3;

    for (let y = 0; y <= LENGTH - windowSize; y++) {
        for (let x = 0; x <= WIDTH - windowSize; x++) {
            let sum = 0;
            for (let wy = 0; wy < windowSize; wy++) {
                for (let wx = 0; wx < windowSize; wx++) {
                    sum += matrix[y + wy][x + wx];
                }
            }
            if (sum >= windowSize * windowSize) {
                pattern.push({ x, y, sum });
            }
        }
    }

    if (pattern.length > 10) {
        console.log(`Unusual Pattern at tick ${currentTick}:`, pattern.length);
        return currentTick;
    }
    return -1;
};

const simulateTick = (
    matrix: number[][],
    robots: Robot[],
    currentTick: number,
): number => {
    robots.forEach((robot) => moveRobot(matrix, robot));
    return detectUnusualPattern(matrix, currentTick);
};

const findSpecialFrame = (
    matrix: number[][],
    robots: Robot[],
    startSecond: number,
): number => {
    let currentFrame = startSecond;
    let found = -1;

    while (found === -1) {
        found = simulateTick(matrix, robots, currentFrame);
        currentFrame++;

        if (currentFrame > WIDTH * LENGTH) return -1;
    }

    logMatrix(matrix);
    return currentFrame - 1;
};

const robots = parseInputFile();
const matrix = initializeMatrix(robots);

const specialFrame = findSpecialFrame(matrix, robots, 100);

console.log("result", specialFrame);
