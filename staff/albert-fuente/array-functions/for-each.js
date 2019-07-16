// expression is a FUNCTION

function forEach(arr,expression){
    for(var i in arr){
        expression(arr[i],i,array);
    }
}

/* 
var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
  console.log(element);
});
 */
// expected output: "a"
// expected output: "b"
// expected output: "c"
