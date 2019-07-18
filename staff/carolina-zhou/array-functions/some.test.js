suite("some", function(){
    test("return true or false", function(){

        var words = [1, 3, 5, 7, 11, 15];
        var result;
        var expected = true;
        result = some(words, function (element){
            if(element > 10) {
              return true 
            } else {
              return false
            }
          })
          check(result, expected);
    });
/* 
    test("break on undefined array", function(){
        try {
            some();
            throw Error("should not reach this point");
        } catch (error){
            check(error.message, 'undefined is not an array');
        }
    });

    test("break when dont receive an expression", function(){
        try{
            some(["carolina", "zhou", "lin"], "a")
            throw Error ("should not reach this point");
        } catch (error){
            check(error.message, "a is not a function")
        }
    });
 */
    test('no array', some, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'undefined is not an array');
    });

    test('string as function', function () { some([],'a'); }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'a is not a function');
    });

});