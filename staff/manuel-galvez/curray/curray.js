'use strict';

/**
 * DIY Array.
 * 
 * 
 */
function Curray() {

    this.length = 0;

    if (arguments.length === 1) {
        this.length = arguments[0];
    } else if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        }
        this.length = arguments.length;
    }
}

Curray.prototype.push = function (element) {
    if (arguments.length === 0) throw TypeError('push needs at least one argument (element to be pushed)');
    this[this.length++] = element;

    return this.length; };

Curray.prototype.pop = function() {
    if (arguments.length > 0) throw TypeError('pop accepts no arguments.');
    var last = this[--this.length];

    delete this[this.length];

    return last;
};

Curray.prototype.forEach = function(expression) {
    if (arguments.length === 0) throw TypeError('an expression should be passed as argument to forEach');

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};

Curray.prototype.indexOf = function(name) {

    for (var i = 0; i < this.length; i++) {
        if ((typeof name === typeof this[i]) && (name.toString() === this[i].toString())) {
            return i;
        } else if (i == this.length - 1 || name == undefined) {
            return -1;
        }
    }
};

Curray.prototype.reduce = function(reducer, initialValue) {
    if (arguments.length !== 1 && arguments.length !== 2) throw TypeError("Wrong number of arguments: two expected (Callback function, initialValue).");
    if (!(reducer instanceof Function)) throw TypeError("First argument must be a callback function that takes 2 arguments (accumulator, value).");
    if (reducer.length !== 2) throw TypeError("Callback function must have two arguments (accumulator, value).");
    
    if (initialValue || initialValue === 0) {
        var accumulator = initialValue
        var start = 0
    } else {
        var accumulator = this[0]
        var start = 1
    }
        
    for (var i = start; i < this.length; i++) {
        accumulator = reducer(accumulator, this[i])
    }

    return accumulator
}


Curray.prototype.reduceRight = function(reducer, initialValue) {
    if (arguments.length !== 1 && arguments.length !== 2) throw TypeError("Wrong number of arguments: two expected (Callback function, initialValue).");
    if (!(reducer instanceof Function)) throw TypeError("First argument must be a callback function that takes 2 arguments (accumulator, value).");
    if (reducer.length !== 2) throw TypeError("Callback function must have two arguments (accumulator, value).");
    
    if (initialValue || initialValue === 0) {
        var accumulator = initialValue
        var start = array.length - 1
    } else {
        var accumulator = this[this.length-1]
        var start = this.length - 2
    }
        
    for (var i = start; i >= 0; i--) {
        accumulator = reducer(accumulator, this[i])
    }
    return accumulator
}


Curray.prototype.join = function (separator) {
    var string = '';
    if (separator == undefined) {
        separator = ',';
    } else if (separator == '') {
        separator = '';
    }

    if (this.length == 1) {
        string = this[0];
        return string;
    } else {
        for (var i = 0; i < this.length; i++) {
            if (i == this.length - 1) {
                string += this[i];
            } else {
                string += this[i] + separator;
            }
        }
        return string;
    }
}

Curray.prototype.includes = function(value) {
    
    for(var i=0; i < this.length; i++){
        var test = false;

        if(this[i] == value){
        test = true;
        }
    }
    return test;
}

Curray.prototype.map = function(expression) {

    if (arguments.length === 0) throw TypeError('an expression should be passed as argument to map()');
    if (!(expression instanceof Function)) throw TypeError("First argument must be a callback function that returns the result of an expression");

    var result = new Curray()

    for (var i = 0; i < this.length; i++)
        result[i] = expression(this[i], i, this)
        result['length'] = i

    return result;
}


Curray.prototype.every = function(expression) {
    if (arguments.length === 0) throw TypeError('an expression should be passed as argument to every()');
    if (!(expression instanceof Function)) throw TypeError("First argument must be a callback function that returns the result of an expression");

    for (var i=0; i < this.length; i++) {
        if (!expression(this[i]))  return false

    }
    return true
}

Curray.prototype.reverse = function() {

    for (var i = 0; i <= Math.floor((this.length - 1) / 2); i++) {
        var a = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = a;
    }
    return this;
  }

Curray.prototype.keys = function () {
    var newCurray = new Curray()

    for (var i = 0; i < this.length; i++) {
        newCurray[i] = i
        newCurray['length'] = i + 1
    }

    return Array.from(newCurray)[Symbol.iterator]()
}

Curray.prototype.fill = function(val, start, end) {
    if (![1,2,3].includes(arguments.length)) throw TypeError('Wrong number of arguments provided. Only accepts 1, 2 or 3 arguments.');

        switch (arguments.length) {
            case 1:
                var start = 0
                var end = this.length
                break;
            case 2:
                var start = arguments[1]
                var end = this.length
                break;
            case 3:
                var start = arguments[1]
                var end = arguments[2]
                break;
        }
        for (var i = start; i < end; i++) {
                    this[i] = val;
        }
        return this;
}

Curray.prototype.entries = function() {
    if (arguments.length > 0 ) throw TypeError('entries() accepts no arguments.');

    var newArr = []
    for (var i = 0; i < this.length; i++) {
        newArr[i] = [i, this[i]]
    }
    // Convert newArray to iterator
    var arrIterator = newArr[Symbol.iterator]();

    return arrIterator
}

Curray.from = function(iterable) {
    if (arguments.length === 0) throw TypeError('from() requires an iterable as first argument');

    var newCurray = new Curray()

    if (iterable instanceof Array || iterable instanceof Curray) {
        for (var i = 0; i < iterable.length; i++) {
            newCurray[i] = iterable[i]
            newCurray['length'] = i+1
        }
    }
    // A case for Array-like iterators (not pure Arrays) should be added here

    return newCurray
}

Curray.prototype.find = function(expression) {
    if (arguments.length === 0) throw TypeError('find() requires a callback function as first argument');
    if (!(expression instanceof Function)) throw TypeError("First argument must be a callback function that returns the result of an expression");

    if (expression.length !== 1)  {
        return undefined 
    }

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) return this[i]
    }
}

Curray.prototype.findIndex = function(expression) {
    if (arguments.length === 0) throw TypeError('findIndex() requires a callback function as first argument');
    if (!(expression instanceof Function)) throw TypeError("First argument must be a callback function that returns the result of an expression");

     if (expression.length !== 1)  {
        return -1
     }
    

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) return i
    }
}

Curray.prototype.concat = function(iterator) {

    var newCurray = new Curray();

    for (var i = 0; i < this.length; i++) {
        newCurray[newCurray.length] = this[i]
        newCurray['length'] += 1 
    }

    for (var i = 0; i < iterator.length; i++) {
        if (iterator[i] instanceof Array || iterator[i] instanceof Curray) {
            for (var j = 0; j < iterator[i].length; j++) {
                newCurray[newCurray.length] = iterator[i][j]
                newCurray['length'] += 1
            }
        } else {
            newCurray[newCurray.length] = iterator[i]
            newCurray['length'] += 1
        }
    }
    return newCurray
}


Curray.prototype.shift = function() {

    var result = this[0];

    for (var i = 1; i < this.length; i++) {
        this[i-1] = this[i];
    }
    delete this[this.length-1];
    this['length'] -= 1;

    return result;

}


Curray.prototype.slice = function(start, end) {

    var newCurray = new Curray();

    if (arguments.length === 0) { return newCurray = this };
    if (arguments.length === 1) { end = this.length; }

    for (var i = start; i < end; i++) {
        newCurray[newCurray.length] = this[i]
        newCurray['length'] += 1
    }

    return newCurray

}


Curray.prototype.some = function(expression) {

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            return true;
        }
    }
    return false;
}


Curray.prototype.sort = function(expression) {

    for (var i = 0; i < this.length-1; i++) {
        var a = this[i];
        var b = this[i+1];
        if (expression(a,b) > 0 || expression(a,b) === 1) {
            this[i] = b;
            this[i+1] = a;
        } else {
            this[i] = a;
            this[i+1] = b;
        }
    }

    for (var i = 0; i < this.length; i++) {
        var a = this[i];
        var b = this[i+1];
        if (expression(a,b) > 0 || expression(a,b) === 1) {
            this.sort(expression)
        }
    }

    return this
}

Curray.prototype.filter = function(expression) {

    var curray = new Curray()
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) { 
            curray[curray.length] = this[i]; 
            curray['length'] += 1;
        }
    }
    return curray
}

Curray.prototype.toString = function() {

    var result = ''
    for (var i = 0; i < this.length; i++) {
        result = result + this[i] + ','
    }

    return result.slice(0,-1)
}

Curray.prototype.values = function() {

    var result = new Curray();
    for (var i = 0; i < this.length; i++) {
        result[result.length] = this[i];
        result['length'] += 1;
    }

    return Array.from(result)[Symbol.iterator]()
}


var arr = [1,2,3,4];
sumJorge(arr, 0, arr.length, function(a,b) {
    return a * b;
});


function sumJorge(array, start, end, callback) {

    var accumulator = array[start] 
    if (start < end) {
        debugger;
        accumulator += callback(accumulator, array[start+1])
        sumJorge(array, start + 1, end, callback);
    }

    console.log(accumulator);
}




