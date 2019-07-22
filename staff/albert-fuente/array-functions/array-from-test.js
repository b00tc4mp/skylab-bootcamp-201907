suite("array-from", function(){

    test('default', function(){
        array=('foo');

        var result=arrayFrom(array);
        checkArrays(result,["f", "o", "o"] );
    });



})

