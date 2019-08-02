console.log("DEMO map");

var array = [1, 2, 3];

console.log("array", array);

var coeficient = 10;

var result = map(function(value){
    return value * coeficient;
})
check(result, [10,20,30])


function check(result, expected){
    if(result.toString() !== expected.toString()) console.error("Error")
}