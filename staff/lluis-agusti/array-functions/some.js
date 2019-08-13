var allArray = [1, 2, 3, 4, 5];
var x = 2;

function some() {
    for (i = 0; i < allArray.length; i++) {
        if ([i] == x) {
            console.log("true");
        }
    }
}
some(x);