suite('filter', function (){

    test('filter all the items who accomplish the condition passed as a function', function (){

        var array = ['hol', 'adi', 'guanchope','cosita','manomens'];         
        var result = filter(array, function(val) {
            return val.length >= 4;
        });

        checkArrays(result, ['guanchope','cosita','manomens']);

    });

    test('filter all the items who accomplish the condition passed as a function', function (){

        var array = [1,2,3,4,5,6];
        var result = filter(array, function(val){
            return val < 4;
        });

        checkArrays(result, [1,2,3]);
    });

    test('filter all the items who accomplish the condition passed as a function', function (){

        var array = [1,2,3,4];
        var result = filter(array, function(val){
            return val > 5;
        });
     
        checkArrays(result, []);
     });

    test('no arguments', function (){
            filter();
        }, function (error){
            check(error instanceof TypeError, true);
            check(error.message, 'missing argument 0 when calling function filter');

    });

    test('not an array', function () {
            filter(1);
        }, function (error) {
            check(error instanceof TypeError, true);
            check(error.message, '1 is not an array');
    }); 
});