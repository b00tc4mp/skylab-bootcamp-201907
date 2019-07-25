var person = {
	name: 'John',
	salute: function() { console.log(this.name + ': Hello!' ); },
	saluteMany: function(names) {
		names.forEach(function(name) {
			//debugger
        	console.log(this.name + ': Hello, ' + name + '!');
		}.bind(this));
    }
}

person.saluteMany(['Mary', 'Charles', 'Phillip']);