var person = {
	name: 'John',
	salute: function() { console.log(this.name + ': Hello!' ); },
	saluteMany: function(names) {
		var salute = function(name) {
			//debugger
        	console.log(this.name + ': Hello, ' + name + '!');
		};

		salute = salute.bind(this);

		names.forEach(salute);
    }
}

person.saluteMany(['Mary', 'Charles', 'Phillip']);