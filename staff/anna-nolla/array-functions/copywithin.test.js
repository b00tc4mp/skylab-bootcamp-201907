test("copyWithin", function(){
    arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    
    var result = copyWithin(5, 0, 4);
    checkArrays(result, [1, 2, 3, 4, 5, 1, 2, 3, 4]);
});