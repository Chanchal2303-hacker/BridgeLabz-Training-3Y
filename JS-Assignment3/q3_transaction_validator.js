"use strict";
// Q3 - Transaction Validator

class NegativeAmountError extends Error {
  constructor(id, amount) { super(`Transaction ${id}: negative amount (${amount})`); this.name = "NegativeAmountError"; }
}
class MissingFieldError extends Error {
  constructor(field, id) { super(`Transaction ${id}: missing "${field}"`); this.name = "MissingFieldError"; }
}
class NullEntryError extends Error {
  constructor(index) { super(`Entry at index ${index} is null`); this.name = "NullEntryError"; }
}

const transactions = [
  { id: 1, amount: 2000 },
  { id: 2, amount: -500 },
  { id: 3 },
  null
];

function validate(tx, index) {
  if (tx === null) throw new NullEntryError(index);
  if (tx.id === undefined) throw new MissingFieldError("id", "?");
  if (tx.amount === undefined) throw new MissingFieldError("amount", tx.id);
  if (tx.amount < 0) throw new NegativeAmountError(tx.id, tx.amount);
  return tx;
}

const valid = [];
const invalid = [];
const errorCategories = { NegativeAmountError: [], MissingFieldError: [], NullEntryError: [] };

for (let i = 0; i < transactions.length; i++) {
  try {
    // DEBUGGER: set a breakpoint on the next line (or keep the debugger statement) and
    // add Watch expressions: i, transactions[i], valid.length, invalid.length.
    // The `debugger` statement only pauses when run under a debugger (F5 in VS Code).
    debugger;
    valid.push(validate(transactions[i], i));
  } catch (err) {
    invalid.push({ index: i, type: err.name, message: err.message });
    if (errorCategories[err.name]) errorCategories[err.name].push(err.message);
    else throw err; // unknown error - don't swallow it
  }
}

console.log("===== FINAL REPORT =====");
console.log(`Successful: ${valid.length}`);
console.log(`Failed    : ${invalid.length}`);
console.log("\nValid:", valid);
console.log("\nInvalid:");
for (const e of invalid) console.log(`  [${e.index}] ${e.type}: ${e.message}`);
console.log("\nBy category:");
for (const [type, list] of Object.entries(errorCategories)) console.log(`  ${type}: ${list.length}`);
