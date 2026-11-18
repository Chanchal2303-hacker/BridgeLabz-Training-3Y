"use strict";
// Q7 - Smart Calculator

class InvalidOperationError extends Error {
  constructor(op) { super(`Unknown operation: "${op}"`); this.name = "InvalidOperationError"; }
}
class DivideByZeroError extends Error {
  constructor() { super("Cannot divide by zero"); this.name = "DivideByZeroError"; }
}
class NegativeRootError extends Error {
  constructor(n) { super(`Cannot take the square root of a negative number (${n})`); this.name = "NegativeRootError"; }
}

function calculate(op, a, b) {
  switch (op) {
    case "add":      return a + b;
    case "subtract": return a - b;
    case "divide":
      if (b === 0) throw new DivideByZeroError();
      return a / b;
    case "power":    return a ** b;
    case "root":     // square root of the first number
      if (a < 0) throw new NegativeRootError(a);
      return Math.sqrt(a);
    default:
      throw new InvalidOperationError(op);
  }
}

function runAll(operations, num1, num2) {
  console.log(`Inputs: num1=${num1}, num2=${num2}`);
  const summary = { ok: 0, failed: 0 };
  for (const op of operations) {
    try {
      const result = calculate(op, num1, num2);
      console.log(`  ${op.padEnd(9)} => ${result}`);
      summary.ok++;
    } catch (err) {
      console.log(`  ${op.padEnd(9)} => ERROR (${err.name}): ${err.message}`);
      summary.failed++;
    }
  }
  console.log(`  Summary: ${summary.ok} succeeded, ${summary.failed} failed\n`);
}

const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

console.log("===== Given inputs =====");
runAll(operations, num1, num2);

console.log("===== Extra: negative root + unknown operation =====");
runAll(["root", "modulo"], -9, 3);
