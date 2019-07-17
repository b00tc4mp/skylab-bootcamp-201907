console.log('TEST: fill');

array1 = [1, 2, 3, 4];

var result1 = filljuan(array1, 0, 2, 4) //,); // expected output: [1, 2, 0, 0]
check(result1, [1, 2, 0, 0]);

var result2 = filljuan(array1, 5, 1) // expected output: [1, 5, 5, 5]
check(result2, [1, 5, 5, 5]);

var result3 = filljuan(array1, 6); // expected output: [6, 6, 6, 6]
check(result3, [6, 6, 6, 6]);


try {
    filljuan()
} catch (e) {
    check(e instanceof TypeError, true);
    check(e.message, 'filljuan debe contener al menos un array y un caracter');
}