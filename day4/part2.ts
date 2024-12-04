const rawFile = await Deno.readTextFile("input.txt")
const rows = rawFile.split(/\n/)
const grid = []
for (const row of rows) {
    grid.push(row.split(''))
}

const candidates = []
for (let j = 0; j < grid.length; j++) {
    const row = grid[j]
    for (let i = 0; i < row.length; i++) {
       if (j + 3 < grid.length + 1 && i + 3 < row.length + 1 ) {
        const row1 = grid[j][i ] + grid[j][i+1] +grid[j][i+2]
        const row2 = grid[j+1][i] + grid[j+1][i+1] +grid[j+1][i+2]
        const row3 = grid[j+2][i] + grid[j+2][i+1] +grid[j+2][i+2]
        candidates.push([row1.split(''), row2.split(''), row3.split('')])
       }
    }
}
let res = 0
for (const candidate of candidates) {
   const rightDiagonal = candidate[0][0] + candidate[1][1] + candidate[2][2]
   const leftDiagonal = candidate[0][2] + candidate[1][1] + candidate[2][0]
   if ((rightDiagonal === "MAS" || rightDiagonal === "SAM") && (leftDiagonal === "MAS" || leftDiagonal === "SAM")) {
    res++
   }

 }
 console.log(res)