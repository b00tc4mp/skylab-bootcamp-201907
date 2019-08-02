'strict mode'

suite('Push', function () {
    test('Push a number and return expected lenght', function () {
        var array = [1, 2, 3, 4]
        var result = push(array, 5)

        check(result, 5)
    })

    test('Push a string and return expected lenght', function () {
        var array = [1, 2, 3, 4]
        var result = push(array, 'string')

        check(result, 5)
    })

    test('No arguments', function () {
        push()
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function Push')
    });

    test('Not an array', function () {
        push("'I'm a String' ")
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, "'I'm a String' is not an array")
    })

})
