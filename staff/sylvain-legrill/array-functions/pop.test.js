suite ('pop', function(){
    test ('remove last items of array of 3, value 3', function () {
        var array = [1,2,3];
        var result = array.pop();
        checkArrays = (result , 3)
    })

    test ('remove last items of array 2 , value 2', function () {
        var array = [1,2];
        var result = array.pop();
        checkArrays = (result , 2)
    })

    test ('remove last items of array 1 , value 1', function () {
        var array = [1];
        var result = array.pop();
        checkArrays = (result , 1)
    })

    test ('string as an array', function(){
        pop('array');      
    }, function (error){
        check(error instanceof TypeError, true);
        check(error.message , 'array is not an array');
    });


}); 




// var array = [1, 2, 3];
// console.log('array', array);

// console.log('pop');
// var result = pop(array);
// check(result, 3);
// check(array, [1, 2]);

// console.log('pop');
// result = pop(array);
// check(result,  2);
// check(array, [1]);

// console.log('pop');
// result = pop(array);
// check(result,1);
// check(array, []);

// try {
   
//     var bad = 1
//     pop(bad);


// } catch(error){
//     check (error instanceof TypeError, true)
//     check (error.message , 'this is not an array')

// }

// test('not an array', function () {
//     forEach(1);
// }, function (error) {
//     check(error instanceof TypeError, true);
//     check(error.message, '1 is not an array');
// });

// suite('map', function () {
//     test('multiply by 10 all items', function () {
//         var array = [1, 2, 3];

//         var coeficient = 10;

//         var result = map(array, function (value) { return value * coeficient; });


//         checkArrays(result, [10, 20, 30]);
//     });

//     test('wrap each element between <>', function () {
//         var array = ['1', '2', '3'];

//         var result = map(array, function (value) { return '<' + value + '>'; });
//         checkArrays(result, ["<1>", "<2>", "<3>"]);
//     });

//     test('concatenate value-index-array', function () {
//         var array = [1, 2, 3];

//         var result = map(array, function (value, index, array) {
//             return value + '-' + index + '-' + array;
//         });

//         checkArrays(result, ["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]);
//     })
// });
