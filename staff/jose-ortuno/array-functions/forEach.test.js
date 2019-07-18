suite('forEach', function () {
    test('outputs element index and array in array', function () {
        var array = ['a', 'b', 'c'];

        var outputs = [];

        forEach(array, function (element, index, array) {
            outputs.push([element, index, array]);
        });

        checkArrays(outputs, [
            ['a', 0, ['a', 'b', 'c']],
            ['b', 1, ['a', 'b', 'c']],
            ['c', 2, ['a', 'b', 'c']]
        ]);
    });

    test('sums all items (numbers)', function () {
        var array = [1, 2, 3];

        var result = 0;
        forEach(array, function (value) {
            result += value;
        });

        check(result, 6);
    });

    test('no arguments', function () {
        forEach();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function forEach');
    });

    test('not an array', function () {
        forEach(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });
});