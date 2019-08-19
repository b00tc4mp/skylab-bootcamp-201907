suite('reduce', function () {

    test('default', function () {

        var array = [1, 2, 3, 4];
        var result = reduce(array, function(accumulator, value) {
            return accumulator * value;
        });
        expected = 24;;
        
        check(result, expected);  
    });
});