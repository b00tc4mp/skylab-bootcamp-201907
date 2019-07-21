console.log('TEST: fill');


/*  //1-FUNCIONA
 // case: result match espected value and fuction runs
var array = ['a', 'b', 'c','d','f','g'];
var result = fill(array,'z',2,4);
check(array, ['a', 'b', 'z','z','f','g']);
 */


/* //2-ERROR
// case: is not an array

var array = 'z';
var result = fill(array);

//result //expected
//array //' is not an array'

try {
    fill();
} catch(error) {
    check(error instanceof TypeError, true);
} */


/* //3-ERROR
// case: is not a function

var array = ['1234567']
var result = fill(array);

//result //expected
//array //' is not an array'

try {
    fill();
} catch(error) {
    check(error instanceof TypeError, true);
} */

//4-ERROR
// case: is not a function
var string= 'abcdefg'
var array = string.split()
var result = fill(array);

//result //expected
//array //' is not a function'

try {
    fill();
} catch(error) {
    check(error instanceof TypeError, true);
}









