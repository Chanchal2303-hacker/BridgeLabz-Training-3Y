"use strict";
// Q2 - Employee Bonus Calculator
// "use strict" means every variable must be declared (const/let) - no implicit globals.

const employees = [
  { name: "Amit", salary: "45000", years: "5" },
  { name: "Sara", salary: "38000", years: "2" },
  { name: "Kiran", salary: "52000", years: "7" }
];

function calculateBonus(emp) {
  // Missing property check
  for (const key of ["name", "salary", "years"]) {
    if (!(key in emp)) throw new Error(`Missing property "${key}"`);
  }
  const salary = Number(emp.salary);
  const years = Number(emp.years);
  // Conversion check: Number("abc") gives NaN silently, so we throw ourselves
  if (Number.isNaN(salary) || Number.isNaN(years)) {
    throw new TypeError(`Cannot convert salary/years to numbers for ${emp.name}`);
  }
  const rate = years > 3 ? 0.1 : 0.05;
  return { name: emp.name, salary, years, rate, bonus: salary * rate };
}

function printAll(list) {
  for (const emp of list) {
    try {
      const r = calculateBonus(emp);
      console.log(`Employee : ${r.name}
  Salary : Rs. ${r.salary.toLocaleString("en-IN")}
  Years  : ${r.years}
  Rate   : ${r.rate * 100}%
  Bonus  : Rs. ${r.bonus.toLocaleString("en-IN")}
  Total  : Rs. ${(r.salary + r.bonus).toLocaleString("en-IN")}\n`);
    } catch (err) {
      console.log(`Error for ${emp && emp.name ? emp.name : "unknown"}: ${err.name} - ${err.message}\n`);
    }
  }
}

console.log("--- Given data ---");
printAll(employees);

console.log("--- Bad data (error handling demo) ---");
printAll([
  { name: "Ravi", salary: "abc", years: "4" }, // conversion error
  { name: "Neha", salary: "40000" }            // missing property
]);
