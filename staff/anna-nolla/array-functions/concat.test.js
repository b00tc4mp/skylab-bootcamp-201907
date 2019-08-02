
test("concat:", function(){
    
    arr = [1, 2, 3];
    arr1 = [4, 5, 6];
    arr2 = ["a", "b", "c"];

    var result = concat(arr, arr1, arr2);
    checkArrays(result, ["1", "2", "3", "4", "5", "6", "a", "b", "c"]); 
});
