suite('copyWhitInD', function(){
    test('no arguments', function(){
        copyWhitinD();
    }, function(error){
        check(error instanceof ReferenceError, true);
        check(error.message, "Missing params.");
    })
    test("'start' or 'end' are not a number", function(){
        copyWhitinD(5,"a","b",[0,1]);
    }, function(error){
        check(error instanceof TypeError, true);
        check(error.message, "'start' or 'end' are not params.")
    })
})
