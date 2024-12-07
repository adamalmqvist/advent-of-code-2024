const rawFile = await Deno.readTextFile("input.txt");
const rows = rawFile.split(/\n/);

let safeCounter = 0;
for (const row of rows) {
    const numbers = row.split(" ").map(Number);
    const isSequenceSafe = isRowSafe(numbers);
    if (isSequenceSafe) safeCounter++;
}
console.log(safeCounter);

function isRowSafe(nums: number[]) {
    if (nums.length <= 1) return false;

    const isDecreasing = nums[0] > nums[1];
    for (let i = 1; i < nums.length; i++) {
        const diff = Math.abs(nums[i] - nums[i - 1]);

        if (isDecreasing) {
            if (nums[i] > nums[i - 1] || nums[i] === nums[i - 1] || diff > 3) {
                return false;
            }
        } else {
            if (nums[i] < nums[i - 1] || nums[i] === nums[i - 1] || diff > 3) {
                return false;
            }
        }
    }
    return true;
}
