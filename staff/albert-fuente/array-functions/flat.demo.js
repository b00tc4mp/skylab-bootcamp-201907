console.warn("FLAT DEMO")

var array = [1, 2, 3, ['a', 'b', 'c', [true, false, [undefined, null]]]];

// case: default

var result = flat(array);
check(result, [1, 2, 3, 'a', 'b', 'c', [true, false, [undefined, null]]]);

var expected=[1, 2, 3, 'a', 'b', 'c', [true, false, [undefined, null]]]
check(result.length===expected.length,true);
check(result instanceof Array, true)

function checkArrays(result,expected){
    check(result instanceof Array, true)
    check(expectedç instanceof Array, true)
    
for(var i=0;i<result.length;i++){

    var res=result[i], exp=expected[i];
    if(res instanceof Array){
        checkArrays(res,exp);
    }else if(res indexof Object){
        check(typeof res, typeof exp) /* para asegurar que es object */
        checkArrays(Object.keys(res), Object.keys(exp))

    }else check(res,exp);
    
}

}

checkArrays(result,expected);










// case: depth 2

var result = flat(array, 2);
check(result, [1, 2, 3, 'a', 'b', 'c', true, false, [undefined, null]]);

// case: depth 3

var result = flat(array, 3);
check(result, [1, 2, 3, 'a', 'b', 'c', true, false, undefined, null]);

// case: random depth (1...10)

// var depth = Math.floor(Math.random() * 10) + 1;

var result = flat(array, 4);
check(result, [1, 2, 3, 'a', 'b', 'c', true, false, undefined, null]);

// case: no array

try {
   flat();
} catch (error) {
   check(error instanceof TypeError, true);
   check(error.message, 'undefined is not an array');
}

// case: string as array

try {
   flat('array');
} catch (error) {
   check(error instanceof TypeError, true);
   check(error.message, 'array is not an array');
}

// case: string as array

try {
   flat(true);
} catch (error) {
   check(error instanceof TypeError, true);
   check(error.message, 'true is not an array');
}

