const numbers = [1, 2, 3];

const moreNumbers = [...numbers, 4, 5];

console.log("numbers", numbers);
console.log("moreNumbers", moreNumbers);

const [first, second, ...others] = moreNumbers;

console.log("first", first);
console.log("second", second);
console.log("others", others);

const numberWithNull = [1, 2, 3, 4, null, 5, null];

console.log("numberWithNull", numberWithNull);

const numberWithoutNulls = numberWithNull.filter(Boolean);

console.log("Boolean(null)", Boolean(null));

console.log("numberWithoutNulls", numberWithoutNulls);
