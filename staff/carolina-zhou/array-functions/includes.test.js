suite('includes', function () {
    test('default', function () {
        var array1 = [1, 2, 3, 4];

        var result = includes(array1, 3);
        check(result, true);
    });

    test('no arguments', function () {
        includes();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function forEach');
    });

    test('not an array', function () {
        includes(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });
});