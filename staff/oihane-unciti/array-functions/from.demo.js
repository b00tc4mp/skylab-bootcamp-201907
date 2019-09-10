

console.log('TEST form');

function testFrom (result, expected){
    if (result.toString() != expected.toString()){
        console.log ("Error expected");

    }
}

try{
   from();
}catch(e){
    testFrom(e instanceof ReferenceError, true);
    testFrom(e.message, "Error de referencia")
}
try{
    from([1], [2]);
 }catch(e){
     testFrom(e instanceof TypeError, true);
     testFrom(e.message, "Error de tipo")
 }

/* var items = "aaa"

var outputs = [];

forEach(items, function (element, index, item) {    
    outputs.push([element, index, item]);
});

check(outputs, [
    ['a', 0, ['a', 'a', 'a']],
    ['b', 1, ['a', 'a', 'a']],
    ['c', 2, ['a', 'a', 'a']]
]);



// case: no arguments

try {
    form();
} catch(error) {
    console.log(e)
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument 0 when calling function forEach');
}

// case: not an array

try {
    form(true);
} catch(error) {
    check(error instanceof TypeError, true);
    check(error.message, '1 is not an object');
}
 */