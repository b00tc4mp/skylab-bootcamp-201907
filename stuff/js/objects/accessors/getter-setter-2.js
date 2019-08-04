// literal

var o = { 
	__x__: 1,
	set x(x) { this.__x__ = x; },
	get x() { return this.__x__; }
};

o.x = 2;
console.log(o.x); // 2

// a posteriori with defineProperty

var o = { __x__: 1 };

Object.defineProperty(o, 'x', {
	set(x) { this.__x__ = x; },
	get() { return this.__x__; }
});

o.x = 2;
console.log(o.x); // 2