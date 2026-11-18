"use strict";
// Q10 - Nested Hoisting and Closures

// 1. PREDICTION: outer() logs undefined, then inner() logs undefined.
// 2. WHY: every function call creates its own execution context. `var` declarations
//    are hoisted to the top of THEIR OWN function, initialised as undefined.
//    outer's `count` is separate from inner's `count`.
//    - outer: count hoisted (undefined) -> console.log -> undefined, then count = 5
//    - inner: has its own hoisted count (undefined) so it never sees outer's 5 and
//      logs undefined, then sets its own count = 10.
//    If inner had no `var count`, closure would give it outer's count (5).
console.log("--- Original ---");
function outer() {
  console.log(count);
  var count = 5;
  function inner() {
    console.log(count);
    var count = 10;
  }
  inner();
  console.log("outer count after inner:", count); // still 5, inner changed only its own copy
}
outer();

// 3. Arrow function version. Behaviour change: the arrow is stored in a const, so it is
//    NOT hoisted as a usable function; calling it before its line gives ReferenceError (TDZ).
//    The inner `var count` still shadows outer's count, so output is still undefined.
console.log("\n--- Arrow inner ---");
function outerArrow() {
  console.log(count);
  var count = 5;
  const inner = () => {
    console.log(count);
    var count = 10;
  };
  inner();
}
outerArrow();

console.log("\n--- Arrow called too early ---");
function outerEarly() {
  try {
    inner(); // TDZ
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
  const inner = () => console.log("never reached");
}
outerEarly();

// 4. DEBUG SESSION: set a breakpoint on `outer();` and use Step Into (F11).
//    Call Stack grows: (anonymous) -> outer -> inner, and shrinks as they return.
//    In the Variables panel, Local scope of outer shows count: undefined at first,
//    then 5; inner's Local shows its own count: undefined, then 10. Closure scope for
//    inner shows outer's variables, but they are shadowed by inner's own count.
