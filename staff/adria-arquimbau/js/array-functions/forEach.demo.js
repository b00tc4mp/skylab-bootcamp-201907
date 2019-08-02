console.log('DEMO: forEach');

var array1 = ['a', 'b', 'c'];
console.log('array ' + array1);

console.log('array1.forEach:')
console.log('unexpected a, b, c');

array1.forEach(function(element) {
  console.log(element);
});

//forEach (array, console.log)

forEach(array, function(element, index, array){
  console.log(element, index, array)
})

