'use strict';

/**
 * DIY Array.
 * 
 * Methods given, are functions that runs like all the methods for arrays, but in this case for the diy array. 
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


Curray.prototype.reverse = function() {
    var result=[];
    for(var i = this.length -1; i>= 0; i--)
        result.push(this[i]);

    return result;

};

Curray.prototype.shift = function() {
  /*   this.length= this.length - this.length-1; */
  var r= this.length - [this.length];
  var result = this[r]
  return result;

};

Curray.prototype.some = function( expression ) {
    var result;
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) result = true;
        else if(!(expression(this[i])) && result == true) result = true;
        else result = false;
    }return result;
}

Curray.prototype.copyWithin = function(index, start, end) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function copyWithin');

    for (var i = start; i < end; i++) {
        this[index++] = this[i];
    };
    return this;
};


Curray.prototype.join = function(separator) {

    var resutl = '';

    if (separator == '' || separator == undefined) separator = ',';

    if (this.length == 1) resutl = this[0];
    else {
      for (var i = 0; i < this.length; i++) {
        if (i == this.length - 1) resutl += this[i];
        else resutl += this[i] + separator;
        }
      }
      return resutl;
  };


Curray.prototype.reduce = function(reducer, initialValue) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function reduce');

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


Curray.prototype.reduceRight = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function reduceRight');
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
    
    var result = [];
    for (var i = this.length -1; i >= 0  ;i--){
        result = expression(result, this[i]);
    }
   return result;
};


Curray.prototype.slice = function(first, last) {
    if (typeof first !== 'number' && last !== undefined) throw new TypeError(first + ' is not a number');
    if (typeof last !== 'number' &&  last !== undefined) throw new TypeError(last + ' is not a number');
    

    var cut = [];
    var negative = -Math.abs(first) 
    if (first === -Math.abs(first) && last === undefined) {
        var positive = Math.abs(negative);
        for (i = this.length-positive; i < this.length; i++) {
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


Curray.prototype.sort = function(expression) {

    var result = [this[0]]
    expression = expression || function (a, b) { return String(a) >= String(b); }

    for (var i = 1; i < this.length; i++) {
      var index = 0
            for (var j = 0; j < result.length; j++) {
        if (expression(this[i], result[j])) {
          index = j + 1;
        } else {
          break
        }
      }
      result.splice(index, 0, this[i])
    }
    
    return result;
};


Curray.prototype.slice = function(start, remove, add1, add2) {

    var result = [];
    var acc = 0;
    var x = remove;

    for (var i = 0; i < this.length; i++) {
        if (i < start) {
            result[acc++] = this[i];
        } else if (x >= 0) {
            if (x === 0) {
                result[acc++] = this[i];
                if (add1 != 0) {
                    result[acc++] = add1;
                    add1 = 0;
                    if (add2 != 0) {
                        result[acc++] = add2;
                        add2 = 0;
                    }
                }
            } else if (x-- === 1) {
                if (add1 != 0) {
                    result[acc++] = add1;
                    add1 = 0;
                    if (add2 != 0) {
                        result[acc++] = add2;
                        add2 = 0;
                    }
                }
            }
        } else if (this.length > start + remove) {
            result[acc++] = array[i];
        }
    }
    return result;
};


Curray.prototype.toString = function() {

    var result = '';
    for (var i = 0; i < this.length; i++){
        result = result + this[i] + ',';
    };
    result = result.substring(0, (result.length-1))

    return result;
};


Curray.prototype.unshift = function() {

    var result = [];
    for (var i = 0; i < arguments.length; i++){
        result[i] = arguments[i];
    };
    for (var i = 0; i < this.length; i++){
        result[i + arguments.length] = this[i];
    };
    return result.length;
};



Curray.prototype.lastIndexOf = function(element) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function lastIndexOf');

    for (var i = this.length+1; i > 0; i--){     
        if ( this[i] === element ){    
          return i;
        }  
      }
    return -1;
};


