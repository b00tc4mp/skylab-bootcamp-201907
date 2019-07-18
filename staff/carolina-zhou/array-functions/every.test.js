/* console.log('TEST every');

var array = [1, 2, 3];
check(array, [1, 2, 3]); 

var result = every(array, 1);
check(result, true);

result = every(array, 4);
check(result, false);

result = every(array, 3);
check(result, true);

true.toString */

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

/*     test('break on undefined array', function () {
        try {
            every();
            throw Error('should not reach this point');
        } catch (error) {
            check(error.message, 'undefined is not an array');
        }
    });
 */
    test('break on undefined array', every, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'undefined is not an array');
    });

/*     test('break on undefined expression', function () {
        var array = [1, 2, 3];
        try {
            every(array);
            throw Error('should not reach this point');
        } catch (error) {
            check(error.message, 'undefined is not a function');
        }
    }); */

    test('break on undefined expression', function () { every([]); }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'undefined is not a function');
    });
});
