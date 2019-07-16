console.log("\n" + "Function demo (every())");

var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var si = true;
var no = false;
count = 0;

function every(arg) {
    for (i = 0; i < arr1.length; i++) {
        if (arr1[i] < arg) {
            count++;
        }
    }

    if(count === arr1.length){
        check(si, "true");
    }
    else{console.log(no)};
}
every(10);
