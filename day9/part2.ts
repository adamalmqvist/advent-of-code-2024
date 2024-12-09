const rawFile = await Deno.readTextFile("input.txt");
const numbers = rawFile.trim().split("").map(Number);

let currentId = 0;
let isLength = true;
const disk = [];

type Block = {
    length: number;
    value: string;
};
for (let i = 0; i < numbers.length; i++) {
    const currentNumber = numbers[i];
    const value = {
        length: currentNumber,
        value: isLength ? String(currentId) : ".",
    };
    disk.push(value);
    if (isLength) {
        currentId++;
    }
    isLength = !isLength;
}

function compact(disk: Block[]) {
    for (let i = disk.length - 1; i >= 0; i--) {
        if (disk[i].value === ".") continue;

        for (let j = 0; j < i; j++) {
            if (disk[j].value === "." && disk[j].length >= disk[i].length) {
                const remainingSpace = disk[j].length - disk[i].length;

                disk[j] = { ...disk[i] };
                disk[i] = { length: disk[i].length, value: "." };

                if (remainingSpace > 0) {
                    disk.splice(j + 1, 0, {
                        length: remainingSpace,
                        value: ".",
                    });
                }

                break;
            }
        }
    }
    return disk;
}

function calculateChecksum(disk: Block[]) {
    let checksum = 0;
    let position = 0;

    for (let i = 0; i < disk.length; i++) {
        const block = disk[i];
        if (block.value !== ".") {
            const fileId = Number(block.value);
            for (let j = 0; j < block.length; j++) {
                checksum += position * fileId;
                position++;
            }
        } else {
            position += block.length;
        }
    }
    return checksum;
}

const compactedDisk = compact(disk);

let diskString = "";
for (let i = 0; i < compactedDisk.length; i++) {
    diskString += compactedDisk[i].value.repeat(compactedDisk[i].length);
}

const checksum = calculateChecksum(compactedDisk);

console.log("Disk Checksum:", checksum);
