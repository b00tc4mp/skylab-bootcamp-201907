function printMe(id) {
	console.log(id, 'I am:', this);
}

printMe(1);

var o = { hola: 'mundo' };

var printMe2 = printMe.bind(o);
printMe2(2);

function bind(func, ctx) {
	return function() {
		func.apply(ctx, arguments);
    }
}

var printMe3 = bind(printMe, o);
printMe3(3);