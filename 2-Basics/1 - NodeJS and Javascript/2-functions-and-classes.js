function sum(a, b) {
  return a + b;
}

class Calculator {
  sum(a, b) {
    return a + b;
  }
}

console.log("First sum", sum(1, 1));
console.log("Second sum", new Calculator().sum(2, 2));
