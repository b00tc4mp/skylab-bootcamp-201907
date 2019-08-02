suite('arrayConcat', function () {
        
    test("case1", function(){
        var item1 = [1];
        var item2 = [2];
        var result = arrayConcat(item1, item2);

        checkArrays(result,  [1, 2]);
    })
    
    test("case2", function(){
        var item1=[1,2,3]; 
        var item2 = [4,5,6];
       
        var  result = arrayConcat(item1,item2);
        checkArrays(result, [1,2,3,4,5,6]);
    })
      

    test('case3', function () {
        arrayConcat(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'The first item is not an array');
    });
});



