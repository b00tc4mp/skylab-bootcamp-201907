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

Curray.prototype.push = function(element) {
  this[this.length++] = element;

  return this.length;
};

Curray.prototype.concat = function() {
  var result = new Curray();

  for (var i = 0; i < this.length; i++) {
    result.push(this[i]);
  }

  for (var j = 0; j < arguments.length; j++) {
    if (typeof arguments[j] === 'object') {
      for (var k = 0; k < arguments[j].length; k++) {
        result.push(arguments[j][k]);
      }
    } else {
      result.push(arguments[j]);
    }
  }
  return result;
};

Curray.prototype.every = function(expression) {
  var checker = true;
  for (var i = 0; i < this.length; i++) {
    if (!expression(this[i])) {
      checker = false;
      return checker;
    }
  }
  return checker;
};

Curray.prototype.pop = function() {
  var last = this[--this.length];

  delete this[this.length];

  return last;
};

Curray.prototype.reverse = function() {
  var holder = new Curray();

  for (var i = 1; i < this.length + 1; i++) {
    holder.push(this[this.length - i]);
  }
  return holder;
};

Curray.prototype.forEach = function(expression) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function forEach');

  if (!(expression instanceof Function))
    throw TypeError(expression + ' is not a function');

  for (var i = 0; i < this.length; i++) expression(this[i], i, this);
};

Curray.prototype.indexOf = function(name) {
  if (arguments.length === 0) throw Error('indexOf is not defined');

  for (var i = 0; i < this.length; i++) {
    if (name === this[i]) {
      return i;
    } else if (i == this.length - 1 || name == undefined) {
      return -1;
    }
  }
};

Curray.prototype.reduce = function(reducer, initialValue) {
  if (arguments.length !== 1 && arguments.length !== 2)
    throw TypeError(
      'Wrong number of arguments: two expected (Array, Callback function).'
    );

  if (!(reducer instanceof Function))
    throw TypeError(
      'Second argument must be a callback function that takes 2 arguments (accumulator, value).'
    );
  if (reducer.length !== 2)
    throw TypeError(
      'Callback function must have two arguments (accumulator, value).'
    );

  if (initialValue || initialValue === 0) {
    var accumulator = initialValue;
    var start = 0;
  } else {
    var accumulator = this[0];
    var start = 1;
  }

  for (var i = start; i < this.length; i++) {
    accumulator = reducer(accumulator, this[i]);
  }
  return accumulator;
};

Curray.prototype.join = function(separator) {
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
};

Curray.prototype.includes = function(value) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function');

  for (var i = 0; i < this.length; i++) {
    var test = false;

    if (this[i] == value) {
      test = true;
    }
  }
  return test;
};

Curray.prototype.map = function(expression) {
  var result = new Curray();

  for (var i = 0; i < this.length; i++) {
    result.push(expression(this[i], i, this));
  }
  return result;
};

Curray.prototype.unshift = function() {
  var copy = new Curray();

  for (var k = 0; k < this.length; k++) {
    copy.push(this[k]);
  }

  this.length = arguments.length;

  for (var j = 0; j < arguments.length; j++) {
    this[j] = arguments[j];
  }

  for (var i = 0; i < copy.length; i++) {
    this.push(copy[i]);
  }

  return this.length;
};

Curray.prototype.sort = function(expression) {
  var element = this;

  for (var i = 0; i < this.length; i++) {
    var a = this[i];
    var b = this[i + 1];

    if (expression(a, b) > 0) {
      this[i] = b;
      this[i + 1] = a;
    } else if (expression(a, b) < 0) {
      this[i] = a;
      this[i + 1] = b;
    }
  }

  for (var i = 0; i < this.length; i++) {
    var a = this[i];
    var b = this[i + 1];

    if (expression(a, b) > 0) {
      this.sort(expression);
    }
  }

  return this;
};

Curray.prototype.flat = function(depth) {
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

Curray.prototype.copyWithin = function(target, start) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function copyWithin');

  // if (!(curray instanceof Curray)) throw TypeError("1 is not an array");

  this[target] = this[start];
  return this;
};

Curray.prototype.arrayOf = function() {
  var curray = [];

  for (var i = 0; i < this.length; i++) {
    curray.push(this[i]);
  }

  return curray;
};

Curray.prototype.fill = function(value, start, end) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function fill');

  var i = 0;
  var j = 0;

  if (end) {
    j = start;

    for (j; j < end; j++) {
      this[j] = value;
    }
    return this;
  } else if (start) {
    i = start;

    for (i; i < this.length - 1; i++) {
      this[i] = value;
    }

    return this;
  } else {
    for (var i = 0; i < this.length - 1; i++) {
      this[i] = value;
    }

    return this;
  }
};

Curray.prototype.splice = function(start, remove, add1, add2) {
  var newArray = [];
  var n = 0;
  var x = remove;

  for (var i = 0; i < this.length; i++) {
    if (i < start) {
      newArray[n++] = this[i];
    } else if (x >= 0) {
      if (x === 0) {
        newArray[n++] = this[i];
        if (add1 != 0) {
          newArray[n++] = add1;
          add1 = 0;
          if (add2 != 0) {
            newArray[n++] = add2;
            add2 = 0;
          }
        }
      } else if (x-- === 1) {
        if (add1 != 0) {
          newArray[n++] = add1;
          add1 = 0;
          if (add2 != 0) {
            newArray[n++] = add2;
            add2 = 0;
          }
        }
      }
    } else if (this.length > start + remove) {
      newArray[n++] = array[i];
    }
  }
  return newArray;
};

Curray.prototype.slice = function(first, last) {
  if (typeof first !== 'number' && last !== undefined)
    throw new TypeError(first + ' is not a number');
  if (typeof last !== 'number' && last !== undefined)
    throw new TypeError(last + ' is not a number');

  var cut = [];
  var negative = -Math.abs(first);
  if (first === -Math.abs(first) && last === undefined) {
    var positive = Math.abs(negative);
    for (i = this.length - positive; i < this.length; i++) {
      cut.push(this[i]);
    }
  } else if (first === Math.abs(first) && last === undefined) {
    for (i = first; i < this.length; i++) {
      cut.push(this[i]);
    }
  } else if (first === undefined && last === undefined) {
    for (i = 0; i < this.length; i++) {
      cut.push(this[i]);
    }
  } else {
    for (i = first; i < last; i++) {
      cut.push(this[i]);
    }
  }
  return cut;
};

Curray.prototype.reduceRight = function(expression) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function reduceRight');
  if (typeof expression !== 'function')
    throw TypeError(expression + ' is not a function');

  var newArray = [];
  for (var i = this.length - 1; i >= 0; i--) {
    newArray = expression(newArray, this[i]);
  }
  return newArray;
};

Curray.prototype.lastIndexOf = function(element) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function lastIndexOf');

  for (var i = this.length + 1; i > 0; i--) {
    if (this[i] === element) {
      return i;
    }
  }
  return -1;
};

Curray.prototype.filter = function(expression) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function filter');
  if (typeof expression !== 'function')
    throw TypeError(expression + ' is not a function');

  var newArray = [];
  var j = 0;

  for (var i = 0; i < this.length; i++) {
    if (expression(this[i])) {
      newArray[j] = this[i];
      j++;
    }
  }
  return newArray;
};

Curray.prototype.find = function(expression) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function find');

  for (var i = 0; i < this.length; i++) {
    if (expression(this[i])) {
      return this[i];
    }
  }
};

Curray.prototype.fill = function(value, start, end) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function fill');

  var i = 0;
  var j = 0;

  if (end) {
    for (var j = start; j < end; j++) {
      this[j] = value;
    }
    return array;
  } else if (start) {
    for (var i = start; i < this.length - 1; i++) {
      this[i] = value;
    }
    return Array.from(this);
  } else if (start === undefined) {
    for (var i = 0; i < this.length - 1; i++) {
      this[i] = value;
    }
    return Array.from(this);
  }
};

Curray.prototype.some = function(expression) {
  if (arguments.length === 0)
    throw TypeError('missing argument 0 when calling function some');
  if (typeof expression !== 'function')
    throw TypeError(expression + ' is not a function');

  for (var i = 0; i < this.length; i++) {
    if (expression(this[i]) === true) {
      return true;
    }
  }
  return false;
};

Curray.prototype.shift = function() {
  var first = this[0];
  for (var i = 1; i < this.length; i++) {
    this[i - 1] = this[i];
  }
  this.length = this.length - 1;
  return first;
};
