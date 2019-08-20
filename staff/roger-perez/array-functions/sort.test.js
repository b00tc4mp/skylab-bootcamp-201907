suite('sort', function () {

    test('should sort original array', function () {
        var array = ['March', 'Jan', 'Feb', 'Dec'];
        var expected = ["Dec", "Feb", "Jan", "March"]

        var result = sort(array);
        
        checkArrays(result, expected);
    });
 
    test('not an array', function () {
        sort(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });
});