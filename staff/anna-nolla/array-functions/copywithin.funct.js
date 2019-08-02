console.log("\n" + "Function demo copywithin()");

var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];


function copyWithin(tar, start, end) {
    count = 0;
    arr2 = [];

    for (i = start; i < end; i++) {
        arr2[count] = arr1[i];
        count++;
    }
    for (var i = 0; i < arr2.length; i++) {
        arr1[tar] = arr2[i];
        tar++;
    }
   return (arr1);
}
copyWithin(5, 0, 4);
