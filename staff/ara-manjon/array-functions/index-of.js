/**
 * Returns the first index at element can be found in the array. Otherwise,  it returns -1.
 * @param {*} element The element to locate in the array.
 * @param {*} index Optional. The index to start to search
 */
function indexOf(array,element,index) {
    var result;
    var toStart;

    if(index)  toStart=index;
    else toStart= 0;

    for(var i = toStart; i <= array.length; i++){
        if(array[i] === element){
            result= i;
            break;
        }else result= -1;
    }return result;
}