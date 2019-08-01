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

Curray.prototype.entries = function () {

    var result = []

    for (var i = 0; i < this.length; i++) {
        result[i] = [Object.keys(this)[i] * 1, this[i]];
    };
    return result
};

Curray.prototype.map = function (expression) {

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function Map');

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        expression(this[i], i, this)
    }

};

Curray.prototype.flat = function (depth) {
    if (!(this instanceof Curray)) throw TypeError(this + 'is not a curray');

    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0 ? 0 : depth;

    var result = []

    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        if (element instanceof Curray && depth > 0) {
            var arr = this[i].flat(depth - 1);

            for (var j = 0; j < arr.length; j++) {
                result.push(arr[j])
            }
        } else {
            result.push(element)
        }
    }
    return result
};

Curray.isCurray = function (argument) {
    return Object.prototype.toString.call(argument) === '[object Object]'
};

Curray.prototype.concat = function () {

    var result = []

    for (var i = 0; i < this.length; i++) {
        result[i] = this[i]
    };

    if (arguments.length > 0) {
        for (var i = 0; i < arguments.length; i++) {
            var items = arguments[i]
            for (var j = 0; j < items.length; j++) {
                result.push(items[j])
            }
        }
    };

    return result.flat()
};


Curray.prototype.every = function (expression) {

    if (this.length == 0) return true;

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    var curr = [];
    var count = 0;

    for (var i = 0; i < this.length; i++) {
        curr[i] = expression(this[i]);
    };

    for (var i = 0; i < curr.length; i++) {
        if (curr[i] === false) {
            return false;
        } else {
            count++
        };
        if (count === curr.length) {
            return true;
        };
    };

};

Curray.prototype.flatMap = function (expression) {

    var depth = 1
    var cache = []
    var result = []

    for (var i = 0; i < this.length; i++) {
        var element = this[i]


        if (element instanceof Curray || element instanceof Array && depth > 0) {

            for (var j = 0; j < element.length; j++) {
                result[i] = expression(element[j])
            }
        } else {
            result[i] = expression(element)
        }

    };

    return result
};

Curray.prototype.includes = function (searchElement, fromIndex) {
    var cache = []
    var status = -1

    var i = !fromIndex ? 0 : fromIndex

    for (i; i < this.length; i++) {
        if (this[i] === searchElement) {
            cache[cache.length] = this[i]
            status = 1
        } else if (cache[0] === undefined) {
            status = 0
        }
    }
    if (status == 1) return true
    if (status == 0) return false
};


Curray.prototype.indexOf = function (searchElement, fromIndex) {

    var result = [];

    fromIndex = !fromIndex ? 0 : fromIndex;

    var i = Math.sign(fromIndex) === -1 ? this.length - Math.abs(fromIndex) : fromIndex;

    i >= this.length ? result[0] = -1 : '';

    for (i; i < this.length; i++) {
        if (this[i] === searchElement) {
            return i;

        } else if (result[0] === undefined) {
            result[0] = -1;
        };
    };
    return result[0];
};

Curray.prototype.join = function (separator) {

    var result = '';
    if (separator == undefined) separator = ','

    for (var i = 0; i < this.length; i++) {
        if (separator == undefined || separator == '') {
            result += this[i]
        } else {
            result += this[i] + (i < this.length - 1 ? separator : '')
        }
    }
    return result
};


Curray.prototype.lastIndexOf = function (searchElement, fromIndex) {

    var result = [];

    fromIndex = !fromIndex ? 0 : fromIndex;

    var i = Math.sign(fromIndex) === -1 ? this.length - Math.abs(fromIndex) : fromIndex;

    i >= this.length ? result[0] = -1 : '';

    for (i; i < this.length; i++) {
        if (this[i] === searchElement) {
            result[0] = i;

        } else if (result[0] === undefined) {
            result[0] = -1;
        };
    };
    return result[0];
};

Curray.prototype.reverse = function () {
    var temp = []
    var length = this.length
    for (var i = 0; i < length / 2; i++) {
        temp = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = temp;
    }
    return this;
}
Curray.prototype.shift = function (returnCurray) {
    var result = []

    if (this.length <= 0) {
        if (this.length == 0) result[0] = undefined;
        return result
    } else {
        result[0] = this[0]
        delete this[0]
        for (var i = 0; i < this.length; i++) {
            this[i] = this[i + 1]
        }
        delete this[--this.length]
    };

    if (returnCurray === 'originalCurray') {
        return this
    } else {
        return result[0]
    }
};

//Carolina Zhou's aproach
Curray.prototype.slice = function (start, end) {

    var result = [];
    var negative = -Math.abs(start)
    if (start === negative && end === undefined) {
        var positive = Math.abs(negative);
        for (var i = this.length - positive; i < this.length; i++) {
            result.push(this[i]);
        }
    } else if (start === Math.abs(start) && end === undefined) {
        for (var i = start; i < this.length; i++) {
            result.push(this[i]);
        }
    } else {
        for (var i = start; i < end; i++) {
            result.push(this[i]);

        }
    }
    return result;
};

Curray.prototype.some = function (expression) {

    if (this.length == 0) return true;

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    var curr = [];

    var result = false

    for (var i = 0; i < this.length; i++) {
        curr[i] = expression(this[i], i, this);
        if (curr[i] === true) result = true
    };
    return result
};

Curray.prototype.toString = function () {
    var result = ''

    for (var i = 0; i < this.length; i++) {
        result += this[i] + (i < this.length - 1 ? ',' : '')
    }
    return result
};

Curray.prototype.unshift = function () {
    var cache = []

    for (var i = 0; i < arguments.length; i++) {
        cache[cache.length] = arguments[i];
    }

    for (var i = 0; i < this.length; i++) {
        cache[cache.length] = this[i];
    };

    for (var i = 0; i < cache.length; i++) {
        this[i] = cache[i];
    };

    return this.length = arguments.length + this.length;
};

Curray.prototype.keys = function () {
    var result = Object.keys(this)
    return result;
};

Curray.prototype.reduce = function (expression, initialValue) {

    var accumulator = initialValue ? initialValue : this[0];
    var indexFrom = initialValue ? 0 : 1;

    for (var i = indexFrom; i < this.length; i++) {
        accumulator = expression(accumulator, this[i])
    }

    return accumulator;
};

Curray.prototype.reduceRight = function (expression, initialValue) {

    var accumulator = initialValue ? initialValue : this[0];

    var indexFrom = initialValue ? 0 : 1;

    for (var i = (this.length - 1); i >= indexFrom; i--) {
        accumulator = expression(accumulator, this[i])

    }

    return accumulator
}

Curray.prototype.sort = function (expression) {
    var result = this;

    for (var i = 0; i < this.length - 1; i++) {
        var a = this[i];
        var b = this[i + 1]
        if (expression(a, b) < 0) {
            this[i + 1] = b;
            this[i] = a;
        } else if (expression(a, b) >= 0) {
            this[i + 1] = a;
            this[i] = b;
        };
    };

    for (var i = 0; i < this.length; i++) {
        var a = this[i];
        var b = this[i + 1]
        if (expression(a, b) > 0) {
            this.sort(expression);
        }
    }
    return this;
};
