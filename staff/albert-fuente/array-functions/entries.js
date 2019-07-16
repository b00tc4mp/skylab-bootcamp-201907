function iterator(arr){
    result=[];
    for(var i in arr){
        result[result.length]=(i, arr[i]);
    }
    return result;
}

/* 
var array1 = ['a', 'b', 'c'];

var iterator1 = array1.entries();

console.log(iterator1.next().value); */
// expected output: Array [0, "a"]
