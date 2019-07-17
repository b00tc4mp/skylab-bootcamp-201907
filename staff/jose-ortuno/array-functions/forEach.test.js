console.log('DEMO: forEach');

var array = [1, 2, 3, 4];
console.log('array', array);

forEach (array, function(value, index, arr) {
    console.log(value, index, arr);
})
