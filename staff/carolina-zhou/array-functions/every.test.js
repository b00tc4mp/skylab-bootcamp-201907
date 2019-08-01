suite('every', function () {
    test('return true on all items matching condition', function () {
        var array = [1, 2, 3];
        var result = every(array, function (x) { return x > 0; });
        check(result, true);
    });

    test('return false on any of the items not matching the condition', function () {
        var array = [1, 2, 3];
        var result = every(array, function (x) { return x < 0; });
        check(result, false);
    });

    test('break on undefined array', every, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'undefined is not an array');
    });

    test('break on undefined expression', function () { every([]); }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'undefined is not a function');
    });
});
