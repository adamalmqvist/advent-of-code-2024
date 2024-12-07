const rawFile = await Deno.readTextFile("input.txt");
const rows = rawFile.split("\n\n");
const rules = rows[0].split("\n").map((rule) => {
  return rule.split("|");
});
const updates = rows[1].split("\n").map((update) => {
  return update.split(",");
});

const invalidUpdateIndexes = new Set();

for (let j = 0; j < updates.length; j++) {
  const update = updates[j];
  for (let i = 0; i < update.length; i++) {
    const file = update[i];

    const rulesForFile = rules.filter((rule) => {
      return rule[0] === file || rule[1] === file;
    });

    const filesAfterFile = update.slice(i + 1);
    const filesBeforeFile = update.slice(0, i);
    const requiredFilesAfterFile = rulesForFile.map((rule) => rule[1]).filter((
      rule,
    ) => file !== rule);
    const requiredFilesBeforeFile = rulesForFile.map((rule) => rule[0]).filter((
      rule,
    ) => file !== rule);
    for (const file of filesAfterFile) {
      if (!requiredFilesAfterFile.includes(file)) {
        invalidUpdateIndexes.add(j);
      }
    }
    for (const file of filesBeforeFile) {
      if (!requiredFilesBeforeFile.includes(file)) {
        invalidUpdateIndexes.add(j);
      }
    }
  }
}
const validUpdates = [];

for (let i = 0; i < updates.length; i++) {
  if (!invalidUpdateIndexes.has(i)) {
    validUpdates.push(updates[i]);
  }
}
let res = 0;
for (let i = 0; i < validUpdates.length; i++) {
  const arr = validUpdates[i];
  const middleIndex = Math.floor(arr.length / 2);

  res += Number(arr[middleIndex]);
}
console.log("validUpdates", res);
