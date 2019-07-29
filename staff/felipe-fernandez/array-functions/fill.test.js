console.log('TEST: fill');

var array = [1, 2, 3, 4, 5];
var array2 = [1, 2, 3, 4, 5];
var array3 = [1, 2, 3, 4, 5];

console.log('array', array);



console.log('fill 1');
var result = fill(array, 5, 1);
check(result, [1, 5, 5, 5, 5]);


console.log('fill 2');

//force error:
var result2 = fill(array2, 1, 4442, 4);

check(result2, [1, 2, 1, 1, 5]);


console.log('fill 3');
 var result3 = fill(array, 5);

check(result3, [5, 5, 5, 5, 5]);


// case: not an array

 try {
    fill();
    //alert('funciona')

} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument 0 when calling function fill'); 
    //alert('fill buit')
}


//// case: is not an array


try {
    fill(1);
    //alert('funciona')

} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, '1 is not an array'); 
    //alert('1 no es un array ') 
} 
