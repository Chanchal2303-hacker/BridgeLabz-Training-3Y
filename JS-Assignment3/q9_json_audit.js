"use strict";
// Q9 - JSON Audit

const rawData = [
  '{"user":"Alex","age":25}',
  '{"id":2}',
  '{invalid}',
  '{"user":"Mina","age":"22"}'
];

const clean = [];
const errors = [];
const required = ["user", "age"];

for (let i = 0; i < rawData.length; i++) {
  const lineNo = i + 1;
  try {
    // Debug: step through here. If JSON.parse throws, control jumps straight to catch
    // and the rest of the try block (key checks, push) is skipped.
    const obj = JSON.parse(rawData[i]);

    const missing = required.filter((key) => !(key in obj));
    if (missing.length > 0) throw new Error(`Missing key(s): ${missing.join(", ")}`);

    clean.push(obj);
  } catch (err) {
    const kind = err instanceof SyntaxError ? "Invalid JSON" : "Validation error";
    errors.push({ line: lineNo, kind, message: err.message });
    console.log(`Line ${lineNo}: ${kind} - ${err.message}`);
  }
}

console.log("\nClean entries:", clean);
console.log(`Errors: ${errors.length} | Valid: ${clean.length}`);

// Bonus: convert age to Number, keep users 18 or older (filter out under-18).
const adults = clean
  .map((u) => ({ ...u, age: Number(u.age) }))
  .filter((u) => !Number.isNaN(u.age) && u.age >= 18);
const minors = clean.length - adults.length;

console.log("\nAdults (age as Number):", adults);
console.log(`Filtered out ${minors} under-18 user(s)`);
