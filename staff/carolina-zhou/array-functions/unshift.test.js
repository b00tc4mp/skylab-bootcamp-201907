suite('unshift', function () {
    test('default', function () {

        var array = [1,2,3,4,5,6];
        var expected = 8;
        var result = unshift(array, -1, 2);

        check(result, expected);
    });

    test('not an array', function () {
        unshift(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });
});

