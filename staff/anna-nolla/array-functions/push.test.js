console.log("demo: push()");

var arr1 = [1,2,3];


var result = push(arr1, "a");
    check(result,4);
    check(arr1, [1,2,3,"a"] );
result = push(arr1, "b");
    check(result, 5);
    check(arr1, [1,2,3,"a","b"]);
