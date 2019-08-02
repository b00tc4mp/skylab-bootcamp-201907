test("join", function(){
    arr = [1,2,3,4,5,6,7,8,9];

    var result = join(arr, "-");
    check(result, "1-2-3-4-5-6-7-8-9");
});


test("join2", function(){
    arr = [1,2,3,4,5];

    var result = join(arr);
    check(result, "1,2,3,4,5");
});

test("join error", function(){
    arr = [1,2,3,4,5];

    var result = join(0);
    check(result, "1,2,3,4,5");
}, function(error){
    check(error.message, "This is not an array");
});

