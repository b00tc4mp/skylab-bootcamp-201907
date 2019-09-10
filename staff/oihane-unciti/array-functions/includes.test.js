suite('includes', function(){
    test('search a value in array, true', function(){
        var array = [1, 2, 3, 4];

        var result = includes(array, 4);
        check(result, true);
    });

    test('search a value in array, false', function(){
        var array = [1, 2, 3, 4];

        var result = includes(array, 5);
        check(result, false);
    });

    test('no value', function(){
        var array = ['abc'];

        var result = includes(array);
        check(result, false);
    });

    test('no arguments', function (){
        includes();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function');
        });

    test('not an array', function (){
         includes(345);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '345 is not an array');
    });


});
