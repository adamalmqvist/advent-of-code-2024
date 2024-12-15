const rawFile = await Deno.readTextFile("input.txt");

type Robot = {
    x: number;
    y: number;
    vx: number;
    vy: number;
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

const calculateSafetyMetric = (matrix: number[][]): number => {
    const quadrants = [
        matrix.slice(0, (LENGTH - 1) / 2)
            .map((row) => row.slice(0, (WIDTH - 1) / 2)),
        matrix.slice(0, (LENGTH - 1) / 2)
            .map((row) => row.slice((WIDTH + 1) / 2)),
        matrix.slice((LENGTH + 1) / 2)
            .map((row) => row.slice(0, (WIDTH - 1) / 2)),
        matrix.slice((LENGTH + 1) / 2)
            .map((row) => row.slice((WIDTH + 1) / 2)),
    ];

    return quadrants.reduce((safetyFactor, quadrant) => {
        const quadrantSum = quadrant.reduce(
            (acc, row) => acc + row.reduce((rowAcc, cell) => rowAcc + cell, 0),
            0,
        );
        return safetyFactor * quadrantSum;
    }, 1);
};

const robots = parseInputFile();
const matrix = initializeMatrix(robots);

const safetyMetric = calculateSafetyMetric(matrix);

console.log("result", safetyMetric);
