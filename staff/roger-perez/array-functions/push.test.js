suite('push', function() {
    test('add a value at the end of an array', function() {
        var array = [1, 2, 3];
        var result = push(array, 4);
        var expected = 4;

        check(result, expected);
        checkArrays(array, [1, 2, 3, 4]);
    });

    test('not an array', function () {
        push(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });
});