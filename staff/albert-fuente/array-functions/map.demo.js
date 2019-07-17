console.log("MAP DEMO");



var numbers = [1, 2,3];
console.log("array",array);
var coeficient=10

var result= map(array,function(value){
    return value*coeficient;
})

console.log(result," expected[10,20,30]")
check(result, [10,20,30]);

var array = ["1", "2","3"];
console.log("array",array);

var result= map(array,function(value){
    return "<" + value + "<1>2 3";
})

console.log(result)


var array = [1, 2,3];
console.log("array",array);

var result= map(array,function(value, index,array){
    return value +"-"+ index+"-"+array;
})





console.log(result," expected[1-0-123] [2-2-123] [3-2-123]")




// var doubles = numbers.map(function(x) {
//    return x * 2;
// });
// doubles is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]
