'use strict';

/**
 *  DIY Array.
 */
function Curray () {
    this.length = 0;

    if (arguments.length === 1) {
        this.length = arguments[0];
    } else if (arguments.length > 1) {
        for (var i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        };
        this.length = arguments.length;
    };
};

Curray.prototype.concat = function(element) {
    for (var i = 0; i < element.length; i++) {
        this[this.length + i] = element[i]
    };
    this.length = this.length + element.length;
    return this;
};

Curray.prototype.copyWithin = function(target, start, end) {
    for (var i = start; i < end; i++) {
        this[target++] = this[i];
    };
    return this;
};

Curray.prototype.find = function(expression) {
    if (arguments.length === 0) throw TypeError ('missing argument when calling function find');

    for (var i = 0; i < this.length; i++){
        if (expression(this[i])) {
            return this[i];
        }
    }
}

Curray.prototype.includes = function(value) {
    var result = false;
    for (var i = 0; result === false; i++) {
        result = false || this[i] === value;
    }
    return result
}
