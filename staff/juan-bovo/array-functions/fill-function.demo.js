console.log('DEMO: fill');

array1 = [1, 2, 3, 4];
console.log('array1', array1);

console.log('fill');
console.log(fill(array1, 0, 2, 4),); // expected output: [1, 2, 0, 0]
console.log('expected output: [1, 2, 0, 0]');

console.log('fill');
console.log(fill(array1, 5, 1)); // expected output: [1, 5, 5, 5]
console.log('expected output: [1, 5, 5, 5]');

console.log('fill');
console.log(fill(array1, 6)); // expected output: [6, 6, 6, 6]
console.log('expected output: [6, 6, 6, 6]');


// function check(result, expected){
//     if (result.toString() !== expected.toString()){
//         console.error('HEY!');
//     }
// }