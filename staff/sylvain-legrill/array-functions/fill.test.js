suite('fill', function (){

     test('fill all the items with the input passed to a fill from the start index you passed', function(){

        var array = [1, 2, 3, 4, 5];

        var result = fill(array, 5, 1);

        checkArrays(result, [1, 5, 5, 5, 5]);

    });


       test('fill all the items with the input passed to a fill', function(){

        var array3 = [1, 2, 3, 4, 5];

        var result3 = fill(array3, 5);

        checkArrays(result3, [5, 5, 5, 5, 5]);

    });


    test('no arguments', function (){
        fill();
    }, function (error){
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function fill');

    });

    test('not an array', function () {
        fill(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });




});
