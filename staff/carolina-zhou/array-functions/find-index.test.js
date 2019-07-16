console.log('TEST findIndex');

var array = [1, 2, 3 , 4 , 5];
check('array', array);

var result = findindex(array , '>' , 2);
check(result, 2);

var result = findindex(array , '<' , 4);
check(result, 0);

var result = findindex(array , '===' , 6);
check(result, undefined);