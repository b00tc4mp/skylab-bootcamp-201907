console.log("\n" + "Function demo (concat())");

var arrC = [];
count = 0;

function concat(...arg) {
    for (i = 0; i < arg.length; i++) {
        for (j = 0; j < arg[i].length; j++) {
            arrC += arg[i][j];
        }
    }
    arrC = arrC.split("");
    check(arrC, [1, 2, 3, 4, 5, 6, "a", "b", "c"]);
}
concat([1, 2, 3], [4, 5, 6], ["a", "b", "c"]);


