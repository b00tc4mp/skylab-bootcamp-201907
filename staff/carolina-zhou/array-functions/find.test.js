console.log('TEST find');

var array = [1, 2, 3 , 4 , 5];

var result = find(array , '>' , 2);
check(result, 3);

var result = find(array , '<' , 4);
check(result, 1);

var result = find(array , '===' , 6);
check(result, undefined);
