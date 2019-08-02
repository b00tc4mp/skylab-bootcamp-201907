test("every", function(){
    arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    var result = every(arr1, mayor);
    check(result, false);
});