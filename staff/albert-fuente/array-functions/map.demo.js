suite('map', function () {
    test('multiply by 10 all items', function () {
        var array = [1, 2, 3];

        var coeficient = 10;

        var result = map(array, function (value) { return value * coeficient; });


        checkArrays(result, [10, 20, 30]);
    });

    test('wrap each element between <>', function () {
        var array = ['1', '2', '3'];

        var result = map(array, function (value) { return '<' + value + '>'; });
        checkArrays(result, ["<1>", "<2>", "<3>"]);
    });

    test('concatenate value-index-array', function () {
        var array = [1, 2, 3];

        var result = map(array, function (value, index, array) {
            return value + '-' + index + '-' + array;
        });

        checkArrays(result, ["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]);
    })
});
