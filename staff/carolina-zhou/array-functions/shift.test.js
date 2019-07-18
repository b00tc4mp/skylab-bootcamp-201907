/* console.log('TEST shift');

var array = [1, 2, 3];

var result = shift(array);
check(result, 1);
check(array, [2, 3]);

result = shift(array);
check(result, 2);
check(array, [3]);

result = shift(array);
check(result, 3);
check(array, []);
 */

'use strict';

suite('shift', function (){

    test('return first value of the array.', function(){
    var array = [1,2,3];
    var expected = 1;
    var result = shift(array);

    check(result,expected); 
    });

    test('break on undefined array',function (){
        try{
            shift();
        } catch (error){
            check(error.message,'undefined is not an array');
        }
    });

});