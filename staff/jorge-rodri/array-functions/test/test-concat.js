suite('concatD', function(){
    test('no arguments', function(){
        concatD();
    }, function(error){
        check(error instanceof ReferenceError, true);
        check(error.message, "Not param in the function");
   
        })
    test('concat all items',function(){
        var arr=[1,2,3]
        var arrC=[4,5,6];
        var res;
        res=concatD(arr,arrC);
        checkArrays(res,[1,2,3,4,5,6]);
    })
})