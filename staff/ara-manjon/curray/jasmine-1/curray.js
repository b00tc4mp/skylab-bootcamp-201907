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

Curray.prototype.pop = function () {
    var last = this[--this.length];

    delete this[this.length];

    return last;
};

Curray.prototype.forEach = function (expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};


Curray.prototype.concat = function (curray2) {
    var currayConcat = new Curray;
    for (var i = 0; i < this.length; i++) {
        currayConcat.push(this[i]);
    }
    for (var i = 0; i < curray2.length; i++) {
        currayConcat.push(curray2[i]);
    }

    return currayConcat;
};


Curray.prototype.arrayOf = function () {
    var curray = [];

    for (var i = 0; i < this.length; i++) curray.push(this[i]);

    return curray;
};


Curray.prototype.every = function (expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function copyWithin');

    if (!(expression instanceof Function)) throw TypeError('is not a function');

    var result = true;
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i]) && result == true) return true;
        else return false;
    }
    return result;
};

Curray.prototype.flat = function (depth) {

    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0 ? 0 : depth;

    var result = [];

    for (var i = 0; i < this.length; i++) {
        var element = this[i];

        if (element instanceof Curray && depth > 0) {
            var arr = this[i].flat(depth - 1, element);

            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }

    return result;
};

Curray.prototype.find = function (expression) {
    var result;
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i]) == true && !result) {
            result = this[i];
        }
    }
    if (!result) {
        result = undefined;
    }

    return result;

};

Curray.prototype.map = function (expression) {

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function map');

    var result = this;

    for (var i = 0; i < this.length; i++)
        result[i] = expression(this[i], i, this);


    return result;
};


Curray.prototype.fill = function (element, start, end) {
    if (!start) {
        start = 0;
    }
    if (!end) {
        end = this.length;
    }
    for (var i = start; i < end; i++) {
        this[i] = element;
    }

    return this;

};


Curray.prototype.filter = function (expression) {
    var result = new Curray();
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            result.push(this[i]);
        }
    }
    return result;
};


Curray.prototype.findIndex = function (expression) {
    if (!(expression instanceof Function)) throw TypeError(condition + ' is not a function');
    var result;
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i]) == true && !result) {
            result = i;
        }
    }
    if (!result) {
        result = -1;
    }

    return result;
};


Curray.prototype.indexOf = function (element, index) {
    var result;
    var toStart;

    if (index) toStart = index;
    else toStart = 0;

    for (var i = toStart; i <= this.length; i++) {
        if (this[i] === element) {
            result = i;
            break;
        } else result = -1;
    }
    return result;
};

 Curray.prototype.includes = function (element) {
    var result;

    for(var i = 0; i < this.length; i++) {

        if(this[i]===element) result = true;
        else if(this[i] !== element && result === true) result = true;
        else result = false;
    
    } return result;
};

Curray.prototype.reduce =  function(expression){
    if (!(expression instanceof Function)) throw TypeError(condition + ' is not a function');
    var result=0;
    for(var i=0; i<this.length;i++){
        result += this[i];
    }
    return expression(result);

};

/* Curray.prototype.reduce = function () {
    var acc = 0;
    for(var i = 0; i < this.length; i++) acc += this[i];
    return acc;
}; */











/* Curray.prototype.copyWithin = function(target, start) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function copyWithin');

    // if (!(curray instanceof Curray)) throw TypeError("1 is not an array");

        this[target] = this[start];
        return this;
}
 */


