console.log("FOR EACH DEMO");


var array1 = ['a', 'b', 'c'];
console.log(array1, " these are the initial values");

function show(){
    console.log()
}
forEach(array1, function(element,index,array) {
    console.log(element,index,array)
});
console.log('expected: \n"a" 0 [a,b,c], \n"b" 1 [a,b,c], \n"c" 2 [a,b,c');



var array2 = [1, 2, 3];
console.log(array2, " these are the initial values");

var result=0;
forEach(array2, function(value){
    result += value;
    return result;
});
console.log(result,'expected: 6');


/* arguments es un pseudo array solo funciona dentro de una función
 */

 [1,2,3].forEach(function(value){
     console.log(value);
     console.log(arguments[0],arguments[1],arguments[2]);

 })