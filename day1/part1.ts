const rawFile = await Deno.readTextFile("input.txt")
const rows = rawFile.split(/\n/)

let rightList = []
let leftList = []
for (let i = 0; i < rows.length; i++) {
    const [right, left] = rows[i].split('   ')
    rightList.push(Number(right))
    leftList.push(Number(left))
}
rightList = rightList.sort((a, b) => a - b)
leftList = leftList.sort((a, b) => a - b)

let res = 0
for (let i = 0; i < rows.length; i++) {
    const leftVal = leftList[i]
    const rightVal = rightList[i]
    const diff = Math.abs(leftVal - rightVal)
    res += diff
}

console.log(res)