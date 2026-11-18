"use strict";
// Q6 - Pyramid Pattern Generator
// Usage: node q6_pyramid.js [rows]     (default = 5; e.g. node q6_pyramid.js 4)

// Outer loop limit from user input with validation and default.
const arg = process.argv[2];
let rows = arg === undefined ? 5 : Number(arg);
if (!Number.isInteger(rows) || rows < 1) {
  console.log(`Invalid input "${arg}", using default 5`);
  rows = 5;
}

console.log(`--- Pyramid with let (${rows} rows) ---`);
for (let i = 1; i <= rows; i++) {
  let line = "";
  for (let j = 1; j <= i; j++) line += "* ";
  console.log(line.trimEnd());
}
// i and j do not exist here: let is block scoped. Using them would throw ReferenceError.
console.log("typeof i after loop (let):", typeof i);

// 1 & 2. With var: output of the pyramid is identical, but the variables are
// function/global scoped, so they LEAK out of the loops and keep their final values.
// Debug tip: Watch i and j - with var there is a single binding reused for all iterations.
console.log("\n--- Same pyramid with var ---");
for (var a = 1; a <= rows; a++) {
  var row = "";
  for (var b = 1; b <= a; b++) row += "* ";
  console.log(row.trimEnd());
}
console.log(`After loop with var: a=${a}, b=${b}  (leaked, final values)`);

// 4. Strict mode catches typos / undeclared loop variables:
console.log("\n--- Undeclared loop variable under strict mode ---");
try {
  for (k = 0; k < 3; k++) { /* k was never declared */ }
} catch (err) {
  console.log(`${err.name}: ${err.message}`);
}
