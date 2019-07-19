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

Curray.prototype.concat = function(curray2) {
    
    var concat = new Curray;

    for(var i=0; i<this.length; i++){
        concat.push(this[i]);
    }

    for(var i=0; i<curray2.length; i++){
        concat.push(curray2[i]);
    }
    

    return concat;
    
};

Curray.prototype.flat = function(curray, depth) {
    
    var result = new Curray;
    
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0? 0 : depth;

    

    for (var i = 0; i < curray.length; i++) {
        var element = curray[i];

        if (element instanceof Curray && depth > 0) {
            var arr = flat(element, depth - 1);

            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }

    return result;
    
};



/* Curray.prototype.copyWithin = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function arrayWithin');

    if (!(curray instanceof Curray)) throw TypeError('1 is not an array');


        curray[target] = curray[start];

    return curray;
}; */
