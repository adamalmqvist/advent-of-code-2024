const rawFile = await Deno.readTextFile("input.txt")
const rows = rawFile.split(/\n/)
const grid = []
for (const row of rows) {
    grid.push(row.split(''))
}
const  Directions = {
    Up : "Up",
    Down : "Down",
    Left : "Left",
    Right : "Right"
}

let currentDirection = Directions.Up
let currentPosistion = { x: 0, y: 0 }
let counter = 0

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === '^') {
            currentPosistion = { x: i, y: j }
            grid[i][j] = 'X'
            counter++
            break
        }
    }
}

while (true) {

    if (currentDirection === Directions.Up) {
    
     const nextPostion = grid[currentPosistion.x - 1][currentPosistion.y]

     if (nextPostion === '#') {
      currentDirection = Directions.Right
     } else {
        if (grid[currentPosistion.x][currentPosistion.y] === ".") {
            grid[currentPosistion.x][currentPosistion.y] = 'X'
            counter++
           }
      currentPosistion.x = currentPosistion.x - 1
     
     }
    } else if (currentDirection === Directions.Right) {
     const nextPostion = grid[currentPosistion.x][currentPosistion.y + 1]
  
     if (nextPostion === '#') {
      currentDirection = Directions.Down
     } else {
        if (grid[currentPosistion.x][currentPosistion.y] === ".") {
            grid[currentPosistion.x][currentPosistion.y] = 'X'
            counter++
           }
      currentPosistion.y = currentPosistion.y + 1
    

     }
    } else if (currentDirection === Directions.Down) {
      const nextPostion = grid[currentPosistion.x + 1][currentPosistion.y]
    
      if (nextPostion === '#') {
       currentDirection = Directions.Left
      } else {
        if (grid[currentPosistion.x][currentPosistion.y] === ".") {
            counter++
            grid[currentPosistion.x][currentPosistion.y] = 'X'
           }
       currentPosistion.x = currentPosistion.x + 1

      }
    } else if (currentDirection === Directions.Left) {
        const nextPostion = grid[currentPosistion.x][currentPosistion.y - 1]
    
        if (nextPostion === '#') {
         currentDirection = Directions.Up
        } else {
            if (grid[currentPosistion.x][currentPosistion.y] === ".") {
                grid[currentPosistion.x][currentPosistion.y] = 'X'
                counter++
               }
         currentPosistion.y = currentPosistion.y - 1
        
        }
  }

  if (grid[currentPosistion.x + 1] && grid[currentPosistion.x + 1][currentPosistion.y] !== undefined) {
    // Safe to access the element
    let element = grid[currentPosistion.x + 1][currentPosistion.y];
    // Do something with element
} else {
    // Handle the out-of-bounds case
    console.log("Out of bounds");
    break
}



}
console.table(grid)
console.log('counter', counter)


