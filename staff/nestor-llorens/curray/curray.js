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

Curray.prototype.constructor = Curray;

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

Curray.prototype.from = function(mapFunction) {
    if (arguments.length === 1 && !(mapFunction instanceof Function)) throw TypeError(mapFunction + ' is not a function');
    var output = new Curray();
    if (arguments.length === 1) {
      for (var i = 0; i < this.length; i++) output.push(mapFunction(this[i]));
    }
    else for (var i = 0; i < item.length; i++) output.push(this[i]);
    return output;
};

Curray.prototype.every = function(expression) {    
    if (arguments.length === 0) throw TypeError('missing argument 0');
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');
    
    for (var i = 0; i < this.length; i++) {
        if (!(expression(this[i]))) return false;
        else continue;       
    }
    return true;
}
Curray.prototype.filter = function(expression) {
    var output = new Curray();
    if (arguments.length === 0) throw TypeError('missing first argument');
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) output.push(this[i]);
    }
    return output;


}
Curray.prototype.includes = function(value, start) {
    if (arguments.length === 0) throw TypeError('missing first argument');
    if (arguments.length !== 2) start = 0;
    if (start < 0) start = this.length + start;

    for (var i = start; i < this.length; i++) {
        if (this[i] === value) return true;
        else continue;
    }
    return false;
}

Curray.prototype.isCurray = function () {
    if (!(this instanceof Curray)) return false;
    else return true;
}


Curray.prototype.map = function(expression) {
   var result = new Curray();
   if (arguments.length === 0) throw TypeError('missing first argument');
   for(var i = 0; i < this.length; i++){
       result.push(expression(this[i]));
   }
   return result;
}
Curray.prototype.reduce = function(expression) {
    if (arguments.length === 0) throw TypeError('missing first argument');
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');
    var total = null;
    for (var i = 0; i < this.length; i++) total += expression(this[i]);
    return total;
}

Curray.prototype.some = function(expression) {    
    if (arguments.length === 0) throw TypeError('missing first argument');
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');
    
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) return true;
        else continue;       
    }
    return false;
}

Curray.prototype.unshift = function() {
    debugger 
    var add = arguments.length;
    for (var i = this.length-1; i >= 0; i--) this[i+add] = this[i];
    for (var j=0; j < arguments.length; j++) this[j] = arguments[j];
    return this.length+arguments.length;
}
