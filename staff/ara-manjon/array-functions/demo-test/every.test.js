console.log('TEST: every');



//1- FUNCIONA

/* var array1 =[1,2,3,4,5,6];
function biggerThan(currentValue) {
    return currentValue <= 0;
}
var resultEvery= (every(array1,biggerThan));
check(resultEvery, 'false') */



/* //2- ERROR
// case: is not an array
var array1 ='[1,2,3,4,5,6]';
function biggerThan(currentValue) {
    return currentValue <= 0;
}
var resultEvery= (every(array1,biggerThan));
check(resultEvery, 'true') */


//3- ERROR
// case: is not a function
var array1 = [1,2,3,4,5,6];
var x='fr'
var resultEvery= (every(array1,x));
check(resultEvery, 'true')


try{
    every();
}catch(error){
    check(error instanceof TypeError, true)
    check(e.message,' is not an array')
}
