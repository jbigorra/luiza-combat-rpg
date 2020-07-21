// Array Destructuring
var ripedFruits = ['bananas', 'kiwis'];

var fruitsDb = [
  ['apple', 'orange'],
  ['watermelon', 'melon']
];

var result = [...ripedFruits, ...fruitsDb];

console.log(result);
