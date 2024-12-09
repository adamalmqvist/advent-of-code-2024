const rawFile = await Deno.readTextFile("input.txt");
const numbers = rawFile.split("");
let currentId = 0;
let isLength = true;

const disk = [];
for (let i = 0; i < numbers.length; i++) {
    const currentNumber = Number(numbers[i]);
    for (let j = 0; j < currentNumber; j++) {
        if (isLength) {
            disk.push(String(currentId));
        } else {
            disk.push(".");
        }
    }
    if (isLength) {
        currentId++;
    }
    isLength = !isLength;
}

function compact(disk: string[]) {
    let modified = false;
    for (let i = disk.length - 1; i >= 0; i--) {
        if (disk[i] === ".") continue;

        const freeSpaceIndex = disk.indexOf(".");

        if (freeSpaceIndex !== -1 && freeSpaceIndex < i) {
            disk[freeSpaceIndex] = disk[i];
            disk[i] = ".";
            modified = true;
        }
    }
    return { disk, modified };
}

let result = { disk, modified: true };
while (result.modified) {
    result = compact(result.disk);
}

const checksum = result.disk.reduce((sum, block, index) => {
    return block !== "." ? sum + Number(block) * index : sum;
}, 0);

console.log("Disk Checksum:", checksum);
