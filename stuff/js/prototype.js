function Person(name, age) {
	this.name = name;
	this.age = age;
}

Person.prototype.info = function() {
	console.log(this.name, this.age);
}

var sho = new Person('Manuel', 23);
var jau = new Person('Jaume', 32);
var caro = new Person('Caro', 18);


//sho.info();
//jau.info();
//caro.info();
var people = [sho, jau, caro];
people.forEach(function(person) { person.info(); })