console.log("TEST from");

var array = ["ABCDE"];

var result = from(array);
check(result, ['A','B','C','D','E']);
check(array, ['ABCDE']);