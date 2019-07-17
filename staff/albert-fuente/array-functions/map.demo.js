console.log("MAP DEMO");



<<<<<<< Updated upstream
var numbers = [1, 5, 10, 15];
console.log(numbers," these are the initial values")


console.log(map(numbers));
=======
var numbers = [1, 2,3];
console.log("array",array);
var coeficient=10

var result= map(array,function(value){
    return value*coeficient;
})

console.log(result," expected[10,2',30")


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
/*     check(result, [10,20,30]);
 */})


console.log(result," expected[1-0-123] [2-2-123] [3-2-123]")




>>>>>>> Stashed changes
// var doubles = numbers.map(function(x) {
//    return x * 2;
// });
// doubles is now [2, 10, 20, 30]
// numbers is still [1, 5, 10, 15]
