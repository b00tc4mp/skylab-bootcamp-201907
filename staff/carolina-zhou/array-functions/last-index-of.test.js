suite('last-index-of', function () {
    test('should itearate an array without altering it', function () {

        var array = ['a', 'b', 'a', 'c', 'a', 'e', 'f'];
        var expected = 4;
        var result = lastIndexOf(array, 'a');

        check(result, expected);

    });

    test('no arguments', function () {
        lastIndexOf();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function lastIndexOf');
    });

    test('not an array', function () {
        lastIndexOf(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });
});