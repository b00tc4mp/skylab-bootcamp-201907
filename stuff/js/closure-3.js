function loop(expression) {
    // return function(iterations) {
    //     for (var i = 0; i < iterations; i++)
    //         expression();
    // }
    return function(iterations) {
        function iteration() {
            expression();

            --iterations && iteration();
        }

        iteration();
    } 
}

var repeat = loop(function() { console.log('hola mundo'); });

console.log('2 times');
repeat(2);

console.log('3 times');
repeat(3);

console.log('4 times');
repeat(4);

