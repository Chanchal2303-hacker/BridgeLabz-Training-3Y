// Q8 - Strict Mode Showdown
// This file is deliberately NOT globally strict: the original code can't even be
// PARSED in strict mode (duplicate params = SyntaxError), so we compile each snippet
// at runtime with new Function and catch the errors.

function run(label, code) {
  try {
    new Function(code)();
    console.log(`${label}: ran without error`);
  } catch (err) {
    console.log(`${label}: ${err.name} - ${err.message}`);
  }
}

console.log("===== WITHOUT strict mode =====");
// - duplicate parameter names allowed; the LAST one wins (a = 10)
// - `total = 10` silently creates a global variable
// - `delete total` works on that implicit global (returns true)
run("sloppy original", `
  function demo(a, a) {
    total = 10;
    console.log("  a is", a, "(last duplicate wins)");
    console.log("  delete total returned", delete total);
  }
  demo(5, 10);
`);

console.log("\n===== WITH strict mode =====");
// Errors in the original are of two kinds. Parse-time errors stop everything, so each
// is tested separately:
run("strict: duplicate params", `"use strict"; function demo(a, a) {} demo(5, 10);`);
run("strict: undeclared assignment", `"use strict"; function demo() { total = 10; } demo();`);
run("strict: delete of a variable", `"use strict"; function demo() { var total = 10; delete total; } demo();`);

console.log(`
WHY STRICT MODE FORBIDS THESE:
 1. Duplicate params: ambiguous - which 'a' do you mean? Almost always a typo.
 2. Undeclared assignment: a typo would silently create a global and pollute the
    global scope. Strict mode turns it into a ReferenceError.
 3. delete on a variable: variables are not properties, delete can't remove them;
    sloppy mode ignored it, strict mode makes it a SyntaxError.`);

console.log("\n===== CORRECT ES6 VERSION =====");
(function () {
  "use strict";
  function demo(a, b) {         // unique parameter names
    let total = a + b;          // declared variable
    // no delete: use scope or reassign (total = undefined) if you need to clear it
    return total;
  }
  console.log("demo(5, 10) =", demo(5, 10));
  const demoArrow = (a, b) => a + b; // ES6 arrow form
  console.log("demoArrow(5, 10) =", demoArrow(5, 10));
})();
