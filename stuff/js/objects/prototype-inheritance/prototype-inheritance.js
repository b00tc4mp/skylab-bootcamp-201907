function Animal(brand, model, age, gender) {
	this.brand = brand;
	this.model = model; 
	this.age = age;
	this.gender = gender;
}

Animal.prototype.toString = function() { return this.brand + ' ' + this.model + ' ' + this.age; };
Animal.prototype.move = function() { return '...'; };
Animal.prototype.pee = function() { return 'pssss'; };
Animal.prototype.poo = function() { return 'plop!'; };
Animal.prototype.reproduce = function(animal) {
	if (this.brand === animal.brand) {
		if (this.gender !== animal.gender)
			return new Animal(this.brand, this.model, 0, Math.random() > 0.5? 'female' : 'male');
		else throw TypeError('cannot reproduce, both have same gender ' + this.gender); 
    } else throw TypeError('cannot reproduce, ' + animal.brand + ' does not match ' + this.brand);
};

var symba = new Animal('Feline', 'carnivore', 12, 'male');
var nala = new Animal('Feline', 'carnivore', 13, 'female');
var child = nala.reproduce(symba);

//var roger = new Animal('human', 'vegan', 25);

function Human(model, age, gender) {
	Animal.call(this, 'Human', model, age, gender);
}

Human.prototype = Object.create(Animal.prototype);
Human.prototype.constructor = Human;

Human.prototype.talk = function() { return 'blah, blah, blah'; };
Human.prototype.reproduce = function(human) {
	if (this.brand === human.brand) {
		if (this.gender !== human.gender)
			return new Human(undefined, 0, Math.random() > 0.5? 'female' : 'male');
		else throw TypeError('cannot reproduce, both have same gender ' + this.gender); 
    } else throw TypeError('cannot reproduce, ' + human.brand + ' does not match ' + this.brand);
};

//var roger = new Human('vegan', 25, 'male');

function Woman(model, age) {
	Human.call(this, model, age, 'female');
}

Woman.prototype = Object.create(Human.prototype);
Woman.prototype.constructor = Woman;
Woman.prototype.reproduce = function(human) {
	if (this.brand === human.brand) {
		if (this.gender !== human.gender)
			return Math.random() > 0.5? new Woman(undefined, 0) : new Man(undefined, 0);
		else throw TypeError('cannot reproduce, both have same gender ' + this.gender); 
    } else throw TypeError('cannot reproduce, ' + human.brand + ' does not match ' + this.brand);
};

function Man(model, age) {
	Human.call(this, model, age, 'male');
}

Man.prototype = Object.create(Human.prototype);
Man.prototype.constructor = Man;
Man.prototype.reproduce = function(human) {
	if (this.brand === human.brand) {
		if (this.gender !== human.gender)
			return Math.random() > 0.5? new Woman(undefined, 0) : new Man(undefined, 0);
		else throw TypeError('cannot reproduce, both have same gender ' + this.gender); 
    } else throw TypeError('cannot reproduce, ' + human.brand + ' does not match ' + this.brand);
};


var mary = new Woman('omnivore', 30);
var john = new Man('vegan', 34);

var nemo = new Animal('Fish', 'vegetarian', 18, 'male');
var memo = new Animal('Fish', 'vegetarian', 20, 'male');

//nemo.reproduce(nala);
//memo.reproduce(nemo);

mary.reproduce(john);
mary.reproduce(john);
mary.reproduce(john);

johh.reproduce(mary);
johh.reproduce(mary);
johh.reproduce(mary);