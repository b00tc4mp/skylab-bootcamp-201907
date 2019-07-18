/* console.log('TEST pop');

var array = [1, 2, 3];

var result = pop(array);
check(result, 3);
check(array, [1, 2]);

result = pop(array);
check(result, 2);
check(array, [1]);

result = pop(array);
check(result, 1);
check(array, []);
 */

suite('pop', function() {
    test('take out the last element from an array', function() {
        var array = [1, 2, 3];
        var value = pop(array);

        check(array.length, 2);
        check(value, 3);
    });

    test('return undefined on empty array', function() {
        var array = [];
        var value = pop(array);

        check(array.length, 0);
        check(value, undefined);
    });

    test('not an array', function () {
        forEach(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });
});