console.log('TEST: every');


var array = ['a', 'a', 'a'];
console.log('array2', array);


var result = every(array, function(val){
    return val === 'a';
});

check(result, true);


var array2 = ['1', '2', '3'];
console.log('array2', array2);


var result2 = every(array2, function(val){
    return val === '1';
});

check(result2, false);


var array3 = ['3', '3', '3'];
console.log('array3', array3);


var result3 = every(array3, function(val){
    return val === '3';
});

check(result3, true);

