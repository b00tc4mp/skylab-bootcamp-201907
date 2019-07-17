var array = [ 0, 1, 2, 3, 4, 5, 6, 7];
var newArray = [];
var count = 0;
var count2 = 0;

function copyWithin (target, start, end) {
    if (arguments.length === 0) throw TypeError('missing argument when calling function copyWithin');
    if (!(target instanceof Number)) throw TypeError(target + ' is not a number');
    if (!(start instanceof Number)) throw TypeError(start + ' is not a number');
    if (!(end instanceof Number)) throw TypeError(end + ' is not a number');
  

    for (var i = start; i < end; i++) {
        newArray[count] = array[i];
        count++;
    }
    
    for (var i = 0; i < newArray.length; i++) {
        array[target] = newArray[count2];
        count2++;
        target++;
    }

    console.log(array);
}
