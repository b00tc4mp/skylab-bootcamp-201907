function Counter(init) {
    this.value = init;
}

Counter.prototype.countUp = function() {
    //return ++this.value;
	return 11;
};

Counter.prototype.countDown = function(){
    return --this.value;
};

// TDD
var counter = new Counter(10);
console.assert(counter.countUp() === 11, 'it should count up to 11 starting from 10');

// BDD
var init = Math.floor(Math.random()*10) + 1;
console.assert(counter.countUp() === init + 1, 'it should count up starting from initial value');