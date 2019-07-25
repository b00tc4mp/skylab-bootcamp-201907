function printMe() {
	console.log('i am:', this);
}

printMe();

var o = { hola: 'mundo' };

var printMe2 = printMe.bind(o);
printMe2();

function bind(func, ctx) {
	return function() {
		func.call(ctx);
    }
}

var printMe3 = bind(printMe, o);
printMe3();