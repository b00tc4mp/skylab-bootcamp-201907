console.log('DEMO: arrayWithin');

suite('arrayWithin', function () {
        
    test("case1", function(){
        var array1 = [1,2,3];
        var result = arrayWithin(array1, 2 , 1);

        checkArrays(result,  [1, 2, 2]);
    });
    
    test('case2', function () {
        arrayWithin();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function arrayWithin');
    });

    test('case3', function () {
        arrayWithin(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message,  '1 is not an array');
    });
});