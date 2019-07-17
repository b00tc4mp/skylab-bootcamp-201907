console.log('TEST: toString');

var array = [1, 2, 3];
var array1 = [6, 'bb', 'pepe', 6]

var result = toStringo(array);
check(result, "1,2,3");

result2 = toStringo(array1);
check(result2, "6,bb,pepe,6");

//Si se le añade un object, devuelve "[object Object]" (type string);
//Si se le añade undefined, devuelve Uncaught TypeError: Cannot read property 'toString' of undefined
try{
    toStringo(undefined);
} catch (error) {
    check(error instanceof TypeError, true);
    console.error(error.message)
}

try{
    toStringo(null);
} catch(error) {
    check(error instanceof TypeError, true);
    console.error(error.message);
}