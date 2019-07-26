//

const o = {
	x: 0.365345,

	getX() { return this.x },

	sumToArray(array) {
		return array.map(function(value) { return value + this.x })
    }
}

o.sumToArray([1, 2, 3]) // [NaN, NaN, NaN]

//

const o = {
	x: 0.365345,

	getX() { return this.x },

	sumToArray(array) {
		return array.map(function(value) { return value + this.x }.bind(this))
    }
}

o.sumToArray([1, 2, 3]) // [1.365345, 2.365345, 3.365345]


//

const o = {
	x: 0.365345,

	getX() { return this.x },

	sumToArray(array) {
		return array.map(value => value + this.x)
    }
}

o.sumToArray([1, 2, 3]) // [1.365345, 2.365345, 3.365345]

//

const o = {
	x: 0.365345,

	getX() { return this.x },

	sumToArray(array) {
		return array.map(value => value + this.x)
    }
}

o.getX() // 0.365345

//

const o = {
	x: 0.365345,

	getX: () => this.x,

	sumToArray(array) {
		return array.map(value => value + this.x)
    }
}

o.getX() // undefined

//

const o = {
	x: 0.365345,

	getX: function() { return this.x }.bind(this),

	sumToArray(array) {
		return array.map(value => value + this.x)
    }
}

o.getX() // undefined


