console.log('TEST: pop');



/* //1-FUNCIONA
// case: result match espected value and fuction runs
var array = [1, 2, 3];
var result = pop(array);

//result //expected
check(result, 3);
check(array, [1, 2]); */



/* //2-ERROR
// case: is not an array

var array = 'z';
var result = pop(array);

//result //expected
//array //' is not an array'
 */



 //3-ERROR
 // case: error: result does not match expected value

var array=[('a','b')];
var result = pop(array);

//result //expected
//array //' is not an array'


try {
    pop(array);
} catch(error) {
     check(error instanceof TypeError, true);
}
 