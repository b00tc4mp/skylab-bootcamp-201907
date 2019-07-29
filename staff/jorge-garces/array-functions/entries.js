var array = ['a', 'b', 'c'];

function entries (arr) {
    for (var i = 0; i < array.length; i++) {
        console.log(`[${i}, "${array[i]}"]`)
    }
}

entries (array);