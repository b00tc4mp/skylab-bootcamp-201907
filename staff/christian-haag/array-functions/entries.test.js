'strict mode'

suite('Entries', function () {
    test('Return Key/value pairs of an array of strings', function () {
        var array = ['a', 'b', 'c', 'd']

        var result = entries(array)

        checkArrays(result, [[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']])

    })

    test('No arguments', function () {
        entries();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function Entries')
    });

    test('not an array', function () {
        entries({});
    }, function (error) {
        check(error instanceof TypeError, true)
        check(error.message, '[object Object] is not an array')
    });
});