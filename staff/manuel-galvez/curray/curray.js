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
            // this.push(arguments[i]); // TRY not to depend on push here.
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
    if (arguments.length === 0) throw TypeError('at least one argument must be passed in to indexOf');

    for (var i = 0; i < this.length; i++) {
        if (name === this[i]) {
            return i;
        } else if (i == this.length - 1 || name == undefined) {
            return -1;
        }
    }
};

Curray.prototype.reduce = function(reducer, initialValue) {
    if (arguments.length !== 1 && arguments.length !== 2) throw TypeError("Wrong number of arguments: two expected (Array, Callback function).");
    if (!(reducer instanceof Function)) throw TypeError("Second argument must be a callback function that takes 2 arguments (accumulator, value).");
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
    if (arguments.length !== 1 && arguments.length !== 2) throw TypeError("Wrong number of arguments: two expected (Array, Callback function).");
    if (!(reducer instanceof Function)) throw TypeError("Second argument must be a callback function that takes 2 arguments (accumulator, value).");
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
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function');
    
    for(var i=0; i < this.length; i++){
        var test = false;

        if(this[i] == value){
        test = true;
        }
    }
    return test;
}

Curray.prototype.map = function(expression) {

  var result = new Curray()

  for (var i = 0; i < this.length; i++)
    result[i] = expression(this[i], i, this)
    result['length'] = i

  return result;
}


Curray.prototype.every = function(expression) {

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
  return newCurray
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

Curray.prototype.from = function(iterable) {
    if (arguments.length === 0) throw TypeError('from() requires an iterable as first argument');

    var newCurray = new Curray()

    if (iterable instanceof Array) {
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

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) return this[i]
    }
}

Curray.prototype.findIndex = function(expression) {
    if (arguments.length === 0) throw TypeError('findIndex() requires a callback function as first argument');

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

Curray.prototype.copyWithin = function(index, start, end) {

    switch(arguments.length) {
        case 0:
            return this;
        case 1:
            start = 0;
            end = index;
            break;
        case 2:
            end = this.length;
        default:
            break
    }
    debugger;
    for (var i = start; i < end; i++) {
        counter = 0

    }
}













