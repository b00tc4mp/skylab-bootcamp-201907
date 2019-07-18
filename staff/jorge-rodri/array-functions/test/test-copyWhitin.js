suite('copyWhitInD', function(){
    test('no arguments', function(){
        copyWhitinD();
    }, function(error){
        check(error instanceof ReferenceError, true);
        check(error.message, "Missing params.");
    })
})