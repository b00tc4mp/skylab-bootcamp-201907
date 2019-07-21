/**
 * The function copies the Array.prototype.concat() method. All the arguments passed, are included in a new array.
 * This profyll not runs with null and undefined, however it's returned if it's into brackets.
 * 
 * @param {a} a the arguments passed into the function. 
 */
function arrayConcat(array,a) {
    if(!(array instanceof Array)) throw TypeError (array + ' is not an array');

    var arr = [];
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Object && !(arguments[i] instanceof Array)) {
            arr.push(arguments[i])
        }else
        switch (arguments[i].toString()) {
            case 'NaN':
                arr.push(NaN);
                
                break;
            case 'true':
                arr.push(true);
                break;
            case 'false':
                arr.push(false);
                break;
        }
        for (var j = 0; j < arguments[i].length; j++) {
            if (arguments[i][j] instanceof Array) {
                var r = arrayConcat(arguments[i][j]);
                for (var x = 0; x < r.length; x++) arr.push(r[x]);
            } else {
                arr.push(arguments[i][j]);
            }
        }
    }
    return arr;
}
