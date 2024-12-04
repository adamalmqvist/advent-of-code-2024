const rawFile = await Deno.readTextFile("input.txt")
const rows = rawFile.split(/\n/)
const grid = []
for (const row of rows) {
    grid.push(row.split(''))
}
let res = 0

const isCorrect = (word: string) => {
    if (word === "XMAS" || word === "SAMX" ) {
        res++
    }
}


for (let j = 0; j < grid.length; j++) {
    const row = grid[j]
    for (let i = 0; i < row.length; i++) {
        if (j + 4 < grid.length + 1) {
            const vertical =  grid[j][i] + grid[j + 1][i] + grid[j + 2][i] + grid[j + 3][i]
            isCorrect(vertical)

        }
        if (i + 4 < row.length +  1) {
             const horizontal =  grid[j][i] + grid[j][i + 1] + grid[j][i + 2] + grid[j][i + 3]
             isCorrect(horizontal)
        }

        if (j + 3 < grid.length && i + 3 < row.length) {
            const diagonalRight = grid[j][i] + grid[j + 1][i + 1] + grid[j + 2][i + 2] + grid[j + 3][i + 3]
            isCorrect(diagonalRight)
        }

        if (j + 3 < grid.length && i - 3 >= 0) {
            const diagonalLeft = grid[j][i] + grid[j + 1][i - 1] + grid[j + 2][i - 2] + grid[j + 3][i - 3]
            isCorrect(diagonalLeft)
        }
  
    }
  }

  console.log(res)

