var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = sum(arr);

console.log(result);

function sum(array) {
    var result = 0, count = 0;

    (function recursivy() {
        if (count < arr.length) {
            result += array[count++];
            
            recursivy();
        }
    })();

    return result;
}