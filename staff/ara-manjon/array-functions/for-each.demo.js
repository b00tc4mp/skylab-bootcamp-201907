console.log('DEMO: forEach');

var array = ['a', 'b', 'c'];
console.log('array ' + array);
forEach(array, function(element,index,array) {
  console.log(element, index, array);
});
forEach(array,console.log)
console.log('exprected: \n"a + index", \n"b + index", \n"c + index"')



var array= [1, 2, 3]
console.log('array'+array)

var result= 0;
forEach(arr,function(value){
  result += value;
})
console.log('exprected: 6')


var array=['q','r','t']
forEach(array, function(element) {
  console.log(arguments[0],arguments[1], arguments[2]);
});