/*
Delayed Promise Resolution:

Create a function that returns a Promise which resolves after a specified delay (in milliseconds). Use setTimeout to simulate the delay and test the function with different delays.
*/

function test(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("1");
      resolve(delay);
      console.log("2");
    }, delay);
  });
}

console.log("a");
test(1000);
console.log("b");
