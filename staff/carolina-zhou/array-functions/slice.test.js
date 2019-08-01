suite("slice", function(){
    test("default 1", function(){
        var array = ["banana", "orange", "lemon", "cherry", "avocado", "apple"];
        var expected = ["orange", "lemon"];
        var result = slice(array, 1, 3);

        checkArrays(result, expected);
    });

    test("default 2", function(){
        var array = ["banana", "orange", "lemon", "cherry", "avocado", "apple"];
        var expected = ["lemon", "cherry", "avocado", "apple"];
        var result = slice(array, 2);

        checkArrays(result, expected);
    });

    test("default 3", function(){
        var array = ["banana", "orange", "lemon", "cherry", "avocado", "apple"];
        var expected = ["cherry", "avocado", "apple"];
        var result = slice(array, -3);

        checkArrays(result, expected);
    });

    test("break if first is not a number", function(){
        slice([1,2,3,4], "a", 6);
    }, function(error) {
        check(error instanceof TypeError, true);
        check(error.message, 'a is not a number');
    });

    test("should break if final is not undefined and is not a number", function(){
        slice([1,2,3,4], 5, "b");
    }, function(error) {
        check(error instanceof TypeError, true);
        check(error.message, 'b is not a number');
    });
});