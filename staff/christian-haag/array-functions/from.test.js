'use strict'

suite('From', function () {
    test('from string to array', function () {
        var string = 'foo';
        var result = from(string);
        checkArrays(result, ['f', 'o', 'o']);
    });

    test('from array to array as shallow-copy', function () {
        var array = [1, 2, 3, 4]
        var result = from(array);
        checkArrays(result, [1, 2, 3, 4])
    });

    test('Call map function to each value of array', function () {
        var array = [1, 2, 3, 4];
        var result = from(array, function (value) {
            return value + value;
        })
        checkArrays(result, [2, 4, 6, 8]);
    });

    test('No arguments', function () {
        from();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function Map')
    });

    test('not a function', function () {
        var array = [1, 2, 3]
        from(array, 'string');
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, "string is not a function")
    });
})



