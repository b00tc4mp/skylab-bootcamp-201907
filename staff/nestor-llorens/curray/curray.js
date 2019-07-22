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
    this[this.length++] = element;

    return this.length;
};

Curray.prototype.pop = function() {
    var last = this[--this.length];

    delete this[this.length];

    return last;
};

Curray.prototype.forEach = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};

Curray.prototype.join = function(separator) {
    // if (!(arguments[0] instanceof Curray)) throw TypeError(this + 'is not a Curray') 

    if (arguments.length === 0) separator = ",";
    if (!(separator instanceof String)) separator = separator.toString();
    var accumulator = '';
    for (var i=0; i<this.length; i++) {
            if (this[i] === undefined || this[i] === null) this[i] = '';
            if (i === (this.length -1)) accumulator += this[i];
            else accumulator += this[i] + separator;
        }
    return accumulator;
  };