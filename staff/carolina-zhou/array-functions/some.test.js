suite("some", function(){
    test("return true or false", function(){

        var array = [1, 3, 5, 7, 11, 15];
        var result;
        var expected = true;
        result = some(array, function (element){
            if(element > 10) {
              return true 
            } else {
              return false
            }
          })
          check(result, expected);
    });

    test('no array', some, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'undefined is not an array');
    });

    test('string as function', function () { some(["carolina", "zhou", "lin"],'a'); }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'a is not a function');
    });

});