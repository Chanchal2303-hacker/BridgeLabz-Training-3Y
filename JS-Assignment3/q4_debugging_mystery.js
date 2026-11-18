"use strict";
// Q4 - Debugging Mystery

// 1. WHY IT FAILS: in strict mode, assigning to an undeclared variable throws
//    ReferenceError. In sloppy mode JS would silently create a global variable.
function showMessageBroken() {
  greeting = "Welcome"; // undeclared
  console.log(greeting);
}

try {
  showMessageBroken();
} catch (err) {
  console.log(`Broken version -> ${err.name}: ${err.message}`);
}

// 2. FIX: declare the variable. `const` makes it block/function scoped, so it
//    exists only inside the function and no longer leaks to the global scope.
function showMessage() {
  const greeting = "Welcome";
  // 3. DEBUGGER: breakpoint here, add Watch: greeting. In the Call Stack panel you
  //    will see: showMessage -> (anonymous/module) top-level call.
  debugger;
  console.log(greeting);
}
showMessage();

console.log("typeof greeting outside function:", typeof greeting); // "undefined" - no leak
