var array1 = ['one', 'two', 'three'];
var array2 = [];

function test(){
    for(var i=0; i<=array1.length + 1; i++){
        array2[i] = array1.pop();
    }
    console.log(array2);
}
test();