suite('concat function', function () {
    test('happy path two arrays', function () {
        var array1 = ['a', 'b', 'f'];
        var array2 = ['d', 'e', 'f'];

        var result = concat (array1, array2);

        checkArrays (result, ["a", "b", "f", "d", "e", "f"])
    });

    test('happy path three arrays', function () {
        var array1 = ['a', 'b', 'c'];
        var array2 = ['d', 'e', 'f'];
        var array3 = ['g', 'h', 'i'];

        var result = concat (array1, array2, array3);

        checkArrays (result, ["a", "b", "c", "d", "e", "f", "g", "h", "i"])
    });

    test('missing arguments', function () {
        concat ();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument when calling function concat')
    });

    test('missing argument two', function () {
        var array1 = ['a', 'b', 'f'];
        concat (array1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument two when calling function concat')
    });

});