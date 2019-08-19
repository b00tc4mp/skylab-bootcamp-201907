suite("reverse", function(){
    test("reverse the direction of the elements, GOOD implementation", function(){
        var array = [1, 2, 3, 4, 5];
        var expected = [5, 4, 3, 2, 1];
        var result = [];

        result = reverse(array);
    
        for (var i in expected){
           check(result[i], expected[i]);
        }        
    })

    test('break on undefined array', function () { reverse(7); }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '7 is not an array');
    });

});