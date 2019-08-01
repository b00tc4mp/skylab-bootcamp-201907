suite('indexOf', function () {
    test('should return index', function () {

        var beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
        var expected = 2;
        var result = indexOf(beasts, 'camel');

        check(result, expected);
    });

    test('no arguments', function () {
        indexOf();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'undefined is not an Array');
    });

    test('not an array', function () {
        indexOf("hello");
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'hello is not an Array');
    });

});