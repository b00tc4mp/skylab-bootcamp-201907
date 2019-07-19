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

};


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
    result.push(expression(this[i], i, this))

  return result;
}
  