const userA = {
  name: "Felipe",
  age: 20
};

const userB = {
  ...userA,
  age: 28
};

console.log("userA", userA);
console.log("userB", userB);

// const age = userB.age;
const { age: userBAge } = userB;
console.log("age", userBAge);
