const rawFile = await Deno.readTextFile("input.txt");
const rows = rawFile.split(/\n\n/).map((row) => row.split(/\n/));
const games = rows.map((row) => {
    const buttonA = row[0].split(":")[1].split(",").map((prize) =>
        prize.split("+")[1]
    ).map(Number);
    const buttonB = row[1].split(":")[1].split(",").map((prize) =>
        prize.split("+")[1]
    ).map(Number);
    const prize = row[2].split(":")[1].split(",").map((prize) =>
        prize.split("=")[1]
    ).map(Number);
    return {
        buttonA,
        buttonB,
        prize,
    };
});

const getButtonPresses = (
    targetX: number,
    targetY: number,
    { buttonA, buttonB }: { buttonA: number[]; buttonB: number[] },
) => {
    const buttonAXIncrement = buttonA[0];
    const buttonAYIncrement = buttonA[1];
    const buttonBXIncrement = buttonB[0];
    const buttonBYIncrement = buttonB[1];
    for (
        let buttonACount = 0;
        buttonACount <= Math.floor(targetX / buttonAXIncrement);
        buttonACount++
    ) {
        for (
            let buttonBCount = 0;
            buttonBCount <= Math.floor(targetY / buttonBYIncrement);
            buttonBCount++
        ) {
            const calculatedX = 0 + (buttonACount * buttonAXIncrement) +
                (buttonBCount * buttonBXIncrement);
            const calculatedY = 0 + (buttonACount * buttonAYIncrement) +
                (buttonBCount * buttonBYIncrement);
            if (calculatedX === targetX && calculatedY === targetY) {
                return {
                    buttonAPresses: buttonACount,
                    buttonBPresses: buttonBCount,
                };
            }
        }
    }
    return null;
};
const ATokenPrize = 3;
const BTokenPrize = 1;

let tokenSpent = 0;
for (const game of games) {
    const { buttonA, buttonB, prize } = game;
    const res = getButtonPresses(
        prize[0],
        prize[1],
        { buttonA, buttonB },
    );
    if (res) {
        tokenSpent += (res.buttonAPresses * ATokenPrize) +
            (res.buttonBPresses * BTokenPrize);
    }
}
console.log("tokenSpent", tokenSpent);
