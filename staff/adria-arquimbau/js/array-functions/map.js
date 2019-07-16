// var allArray = [1, 2, 3, 4]
// var result = 0;

// function map() {
// for (var i = 0; i < allArray.length; i++) {
//    result += allArray[i]*2;
//  } console.log(result);
// }

// map();

// // seria igual que --> var map1 = array1.map(x => x * 2);

function map(array, expression){
  var result = [];
  
  for (let i = 0; i < array.length; i++) 
    result[i] = expression(array[i]);
    
  return result;
}