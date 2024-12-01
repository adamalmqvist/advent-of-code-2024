const rawFile = await Deno.readTextFile("input.txt")
const rows = rawFile.split(/\n/)

const leftList = []
const rightMap: {[key: number]: number} = {}

for (let i = 0; i < rows.length; i++) {
    const [right, left] = rows[i].split('   ')
    if (rightMap[Number(right)]) {
        rightMap[Number(right)]++
    } else {
        rightMap[Number(right)] = 1
    }
    leftList.push(Number(left))
}



let res = 0
for (let i = 0; i < rows.length; i++) {
    const leftVal = leftList[i]
    const rightCount = rightMap[leftVal] || 0
    res += leftVal * rightCount
}

console.log(res)