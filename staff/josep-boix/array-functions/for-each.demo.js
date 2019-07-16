console.log("DEMO: forEach");

var array = ['a','b','c'];
console.log('array', array);

forEach(array, function (element){
    console.log(element);
});

console.log('expected: \n"a", \n"b", \n"c"');

array =[1,2,3];
console.log("array",array);

var result = 0;
forEach(array, function (value){
    result += value;
});

console.log(result, 'expected: 6');