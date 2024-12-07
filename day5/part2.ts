const rawFile = await Deno.readTextFile("input.txt");
const rows = rawFile.split("\n\n");
const rules = rows[0].split("\n").map((rule) => {
  return rule.split("|");
});
const updates: string[][] = rows[1].split("\n").map((update) => {
  return update.split(",");
});
const invalidUpdateIndexes = new Set<number>();

while (true) {
  let found = false;
  for (let j = 0; j < updates.length; j++) {
    const update = updates[j];
    for (let i = 0; i < update.length; i++) {
      const file = update[i];

      const rulesForFile = rules.filter((rule) => {
        return rule[0] === file || rule[1] === file;
      });

      const filesAfterFile = update.slice(i + 1);

      const filesBeforeFile = update.slice(0, i);

      const requiredFilesAfterFile = rulesForFile.map((rule) => rule[1]).filter(
        (rule) => file !== rule
      );

      const requiredFilesBeforeFile = rulesForFile.map((rule) => rule[0])
        .filter((rule) => file !== rule);

      for (const file of filesAfterFile) {
        if (!requiredFilesAfterFile.includes(file)) {
          const indexOfFile = update.indexOf(file);
          updates[j][indexOfFile] = updates[j][i];
          updates[j][i] = file;
          invalidUpdateIndexes.add(j);
          found = true;
        }
      }
      for (const file of filesBeforeFile) {
        if (!requiredFilesBeforeFile.includes(file)) {
          const indexOfFile = update.indexOf(file);
          updates[j][indexOfFile] = updates[j][i];
          updates[j][i] = file;
          invalidUpdateIndexes.add(j);
          found = true;
        }
      }
    }
  }
  if (!found) {
    break;
  }
}

const invalidUpdates: string[][] = [];

for (const index of invalidUpdateIndexes) {
  invalidUpdates.push(updates[index]);
}

let res = 0;
for (let i = 0; i < invalidUpdates.length; i++) {
  const arr: string[] = invalidUpdates[i];
  const middleIndex = Math.floor(arr.length / 2);

  res += Number(arr[middleIndex]);
}
console.log("res", res);
