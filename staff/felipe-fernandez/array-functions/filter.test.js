console.log('TEST: filter');

var array = ['hola','adios','guanchope','cosita','manomens'];
var array2 = ['a', 'addnte','bajo', 'addnte'];
console.log('array', array);

console.log('filter');
//condicion si es más grande que 4 la palabra

var result = filter(array, 5);


check(result, ['guanchope cosita manomens ']);
 /* console.log(result, "expected: ['guanchope','cosita', 'manomens']");
console.log(array, "expected: ['hola, adios, guanchope','cosita, manomens]");    
 */
console.log('filter');

/* var result2 = filter(array2); */

/*console.log(result2, `expected: []`);
console.log(array2, `expected: ['a', 'addnte','bajo', 'addnte']`); 

 */
/* 

test('filter all the items who accomplish the condition passed as a function', function (){

    var array3 = [1,2,3,4];
            
    var result3 = filter(array3, function(val){
        return val > 4;
    });

    checkArrays(result3, []);
}); */

