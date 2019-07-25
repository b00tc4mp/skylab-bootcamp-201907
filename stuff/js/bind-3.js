console.log(id, 'I am:', this);

return id;
}

var id = printMe(1);
console.log('id', id);

var o = { hola: 'mundo' };

var printMe2 = printMe.bind(o);
id = printMe2(2);
console.log('id', id);

function bind(func, ctx) {
return function() {
    return func.apply(ctx, arguments);
}
}

var printMe3 = bind(printMe, o);
id = printMe3(3);
console.log('id', id);