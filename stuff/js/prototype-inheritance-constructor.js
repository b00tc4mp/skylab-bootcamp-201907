function Animal(gender) {
	this.gender = gender;
}

Animal.prototype.move = function() { return '...'; };

var lion = new Animal('male');
console.log(lion.constructor);

function Human(name, gender) {
	Animal.call(this, gender);
	
	this.name = name;
}

//Human.prototype = new Animal();
Human.prototype = Object.create(Animal.prototype);
Human.prototype.constructor = Human; //WHY this? see outputs... TRY commenting this line and check outputs again ,)

var john = new Human('John', 'male');
console.log(john.constructor);