console.log('TEST: find-index');

var fruitsArray = ["banannas" , "cherries" , "apples" , "oranges" , "strawberries"];

var result1 = findIndex(fruitsArray , function(value){
   return  value === "banannas";
});
check(result1 , 0);

// var result2 = findIndex(fruitsArray , function(value){
//     return value === "strawberries";
// });
// check(result2 , 4);

// var result3 = findIndex(fruitsArray , function(value){
//     return value === "apples"
// });
// check(result3 , 2);