console.log('TEST indexOf');

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

var result = indexOf(beasts, 'camel');
check(result, 2);

var result = indexOf(beasts, 'bison');
check(result, 1);

var result = indexOf(beasts, 'felipe');
check(result, -1);
