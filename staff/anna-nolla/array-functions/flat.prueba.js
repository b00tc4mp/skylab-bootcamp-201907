



 console.log('TEST flat');

 var array = [1, 2, 3, ['a', 'b', 'c', [true, false, [undefined, null]]]];

 // case: default
 var result = flat(array);
 console.log(result, [1, 2, 3, 'a', 'b', 'c', [true, false, [undefined, null]]]);
 
 // case: depth 2
 var result = flat(array, 2);
 console.log(result, [1, 2, 3, 'a', 'b', 'c', true, false, [undefined, null]]);
 
 // case: depth 3
 var result = flat(array, 3);
 console.log(result, [1, 2, 3, 'a', 'b', 'c', true, false, undefined, null]);
 
 // case: random depth (1...10)
 // var depth = Math.floor(Math.random() * 10) + 1;
 var result = flat(array, 4);
 console.log(result);
 var arr =[];


 function flat(array, depth) {

    if (!(array instanceof Array)) throw TypeError (array + ' is not an array');
    
    depth = typeof depth === 'undefined'? 1 : depth;
    
    var result = [];
    
    for (i = 0; i < array.length; i++){
        
        var element = array[i];
        
        if (element instanceof Array && depth > 0) {
            arr = flat(element, depth -1);
            
            for (j = 0; j < arr.length; j++){
                result.push(arr[j]);
            }
        }
        else {
            result.push(element);
        }
    }
    console.log(result);
}
 
/* //case: no array
 try {
    flat();
 } catch (error) {
    check(error instanceof TypeError, true);
    check(error.message, 'undefined is not an array');
 }
 // case: string as array
 try {
    flat('array');
 } catch (error) {
    check(error instanceof TypeError, true);
    check(error.message, 'array is not an array');
 }
 // case: string as array
 try {
    flat(true);
 } catch (error) {
    check(error instanceof TypeError, true);
    check(error.message, 'true is not an array');
 } 
 */