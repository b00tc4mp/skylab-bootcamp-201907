

function slice(array, first, last) {
    var cut = [];
    var negative = -Math.abs(first); 
    if (first === negative && last === undefined) {
        var positive = Math.abs(negative);
        for (i = array.length-positive; i < array.length; i++) {
            cut.push(array[i]);
        }
    } else if (first === Math.abs(first) && last === undefined) {
        for (i = first; i < array.length; i++) {
            cut.push(array[i]);
        }
    } else {
        for (i = first; i < last; i++) {
            cut.push(array[i]);
        }
    }
    return cut;
} 



/* var months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'June']

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ['Jan', 'Feb', 'March', 'April', 'May'] */
