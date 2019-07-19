// 0

var o = {
	set name(name) {
		this.__name__ = name.toUpperCase();
    },

	get name() {
		return this.__name__;
    }
};

o.name = 'pepe';

o.name; // => 'PEPE'

// 1

var p = {
	get info() { return this.name + ' ' + this.surname; }
};

p.name = 'John'; p.surname = 'Doe'; p.info; // => 'John Doe'

// 2

var p = { 
	get name() { return 'John'; }
};

p.name; // => 'John'

p.name = 'Markus';

p.name; // => 'John'