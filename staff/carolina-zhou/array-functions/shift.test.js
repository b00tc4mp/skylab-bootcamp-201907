suite('shift', function (){

    test('return first value of the array.', function(){
    var array = [1,2,3];
    var expected = 1;
    var result = shift(array);

    check(result,expected); 
    });

    test('break on undefined array', shift, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'undefined is not an array');
    });

});