suite('unshift', function(){
    array1 = [1, 2, 3];

    test('unshift default', function(){
        var result = unshifty(array1, 4, 5); //--> console.log incluido en la function;
        check(result, 5);
    });

    test('first parameter not an array', function() {
        unshifty (null);
    
    }, function(error){
        check(error instanceof TypeError, true);
        check(error.message, 'unshifty necesita que el primer parámetro sea un Array');
    });




})


// try {
//     unshifty(null)
// } catch(e){
// }