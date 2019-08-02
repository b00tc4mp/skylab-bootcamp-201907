console.log("\n" + "Function demo concat()");

function concat(...arg) {
    var arrC = [];

    for (i = 0; i < arg.length; i++) {
        for (j = 0; j < arg[i].length; j++) {
            arrC += arg[i][j];
        }
    }
    arrC = arrC.split("");

    return (arrC);
}


