console.log('TEST: fill');

array1 = [1, 2, 3, 4];
console.log('array1', array1);

var result1 = filljuan(array1, 0, 2, 4) //,); // expected output: [1, 2, 0, 0]
check(result1, [1, 2, 0, 0]);

var result2 = filljuan(array1, 5, 1) // expected output: [1, 5, 5, 5]
check(result2, [1, 5, 5, 5]);

var result3 = filljuan(array1, 6); // expected output: [6, 6, 6, 6]
check(result3, [6, 6, 6, 6]);


// function check(result, expected){
//     if (result.toString() !== expected.toString()){
//         console.error('HEY!');
//     }
// }