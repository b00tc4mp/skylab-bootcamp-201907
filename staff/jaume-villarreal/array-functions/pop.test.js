console.log('TEST: pop')

var array = [1 , 2 , 3 , 4 , 5];

var result = pop(array);
debugger
check(result , 5);
check(array , [1 , 2 , 3 , 4]);

result = pop(array);
check(result , 4);
check(array , [1 , 2 , 3 ]);
