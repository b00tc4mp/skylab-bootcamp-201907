suite('copyWith', function () {
    test('Happy path', function () {
        var array = [ 0, 1, 2, 3, 4, 5, 6, 7];
        
        var result = copyWithin (array, 0, 2, 4);

        checkArrays(result, [2, 3, 2, 3, 4, 5, 6, 7]);
    });

    test('missing argument', function() {
        copyWithin();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function copyWithin');
    });

    test('missing argument', function() {
        var array = [ 0, 1, 2, 3, 4, 5, 6, 7];
        copyWithin(array, 0, 2, 8);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'superior range than array length');
    });

    test('missing argument', function() {
        var array = [ 0, 1, 2, 3, 4, 5, 6, 7];

        copyWithin(array, 0, -1, 4);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'length less than zero is not possible');
    });
});