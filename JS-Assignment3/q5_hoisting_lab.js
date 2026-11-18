"use strict";
// Q5 - Hoisting Lab: The Sequence Trap
//
// PREDICTION for the original code:
//   console.log(score)  -> undefined      (var is hoisted and initialised to undefined)
//   announce()          -> "Game started" (function declarations are hoisted fully, body included)
//   let status = "ready"; startGame() -> "ready"
//
// MEMORY STATE of each hoisted element:
//   score      (var)      : declared, value undefined until line `score = 50` runs
//   announce   (function) : declared AND defined (fully usable from line 1)
//   status     (let)      : hoisted but in the Temporal Dead Zone until its line runs
//   startGame  (function) : declared AND defined
// The "trap": the original works here only because `let status` runs BEFORE startGame().
// If startGame() were called above the let line, it would throw ReferenceError.

console.log("--- Original ---");
console.log(score);
announce();
var score = 50;
function announce() { console.log("Game started"); }
let status = "ready";
startGame();
function startGame() { console.log(status); }

// Show the real trap: calling before the let line.
console.log("\n--- TDZ trap ---");
try {
  earlyStart();
  let mode = "hard";
  function earlyStart() { console.log(mode); }
} catch (err) {
  console.log(`${err.name}: ${err.message}`);
}

// FIXED version: declare first, use after.
console.log("\n--- Fixed ---");
let fixedScore = 50;
let fixedStatus = "ready";
function announceFixed() { console.log("Game started"); }
function startGameFixed() { console.log(fixedStatus); }
console.log(fixedScore);
announceFixed();
startGameFixed();

// ARROW FUNCTION version: arrow functions are stored in const/let, so they are NOT
// usable before their line (TDZ). Function declarations are.
console.log("\n--- Arrow versions ---");
try {
  announceArrow(); // ReferenceError - const is in TDZ
} catch (err) {
  console.log(`Before definition: ${err.name}: ${err.message}`);
}
const announceArrow = () => console.log("Game started (arrow)");
const startGameArrow = () => console.log(fixedStatus);
announceArrow();
startGameArrow();
