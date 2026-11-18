"use strict";
// Q1 - Dynamic Data Parser
// Debug note: Number(" ") is 0 and Number(null) is 0, so Number() alone can't be trusted
// for validation. We add explicit checks for blank strings, null and undefined.

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

const validNumbers = [];   // { index, raw, value }
const invalidEntries = []; // { index, raw, reason }

// Returns a reason string if the value is NOT a usable number, otherwise null.
function numericProblem(raw) {
  if (raw === null || raw === undefined) return "null/undefined is not data";
  if (typeof raw === "string" && raw.trim() === "") return "blank string (Number() would wrongly give 0)";
  const n = Number(raw);
  if (Number.isNaN(n)) return "cannot be converted to a number (NaN)";
  return null;
}

for (let i = 0; i < apiData.length; i++) {
  const raw = apiData[i];
  const asNumber = Number(raw);   // conversion forms requested in task 1
  const asBoolean = Boolean(raw); // NOTE: Boolean("false") is TRUE - any non-empty string is truthy
  const asString = String(raw);   // String(null) -> "null", String(undefined) -> "undefined"

  const problem = numericProblem(raw);
  const status = problem ? "INVALID" : "VALID  ";

  console.log(`[${i}] ${status} raw=${JSON.stringify(raw)} | Number=${asNumber} | Boolean=${asBoolean} | String="${asString}"`);

  if (problem) {
    invalidEntries.push({ index: i, raw, reason: problem });
  } else {
    validNumbers.push({ index: i, raw, value: asNumber });
  }
}

console.log("\n===== REPORT =====");
console.log(`Total: ${apiData.length} | Valid: ${validNumbers.length} | Invalid: ${invalidEntries.length}`);

console.log("\nValid numeric data:");
for (const item of validNumbers) console.log(`  index ${item.index}: ${item.value}`);

console.log("\nInvalid / skipped data:");
for (const item of invalidEntries) console.log(`  index ${item.index}: ${JSON.stringify(item.raw)} -> ${item.reason}`);

const sum = validNumbers.reduce((acc, x) => acc + x.value, 0);
console.log(`\nSum of valid numbers: ${sum}`);
