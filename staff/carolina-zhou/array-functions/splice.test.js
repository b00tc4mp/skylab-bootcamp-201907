suite('splice', function () {
    test('should delate some elements and add anothers', function () {
        var array = [1, 2, 3, 4, 5, 6];
        var result = splice(array, 2, 1, 'a', 'b');
        var expected = [1, 2, "a", "b", 4, 5, 6];

        checkArrays(result, expected);

    });

    test('not an array', function () {
        splice(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });

});