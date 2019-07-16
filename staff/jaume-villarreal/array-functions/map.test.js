console.log('TEST: map');

array = [1 , 2 , 3 , 4];

var result1 = map(array , '*' , 2);
check(result1 , [2 , 4 , 6 , 8]);

var result2 = map(array , '+' , ' is a number');
check(result2 , ["1 is a number" , "2 is a number" , "3 is a number" , "4 is a number"]);