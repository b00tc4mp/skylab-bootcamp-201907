suite('dFilter', function(){
    test('no arguments', function(){
        dFilter();
    }, function(error){
        check(error instanceof ReferenceError, true);
        check(error.message, "Not arguments in the function");
    })
    test('function filter is okey', function(){
        var arr=[1,2,3];
        var fn=function(x){if(x<3)return true; else return false;};
        var res;
        res=dFilter(arr,fn);
        checkArrays(res,[1,2]);
    })
})