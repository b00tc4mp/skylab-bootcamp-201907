'use strict';

// Curray Jasmine

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

Curray.prototype.push = function (element) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function push');

    this[this.length++] = element;

    return this.length;
};

Curray.prototype.pop = function() {
    if (typeof this === 'string') throw TypeError(this + 'is not a curray');

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

Curray.prototype.concat = function(element) {
    if (element.length === 0) throw TypeError (`missing argument when calling function concat`);
    if (element.length === 1) throw TypeError (`missing argument two when calling function concat`);

    for (var i = 0; i < element.length; i++) {
        this[this.length + i] = element[i]
    };
    this.length = this.length + element.length;
    return this;
};

Curray.prototype.copyWithin = function(target, start, end) {

    if (start < 0) throw TypeError('length less than zero is not possible');

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
        };
    };
};

Curray.prototype.every = function(expression) {
    if (this.length === 0) throw TypeError('curray length 0 when calling function every');

    for (var i = 0; i < this.length; i++) {
        var check = true && expression(this[i])
    };
    return true && check;
};

Curray.prototype.map = function(expression) {

    var curray = this;
    var x = this.length;
    var result = new Curray();
    for (var i = 0; i < x; i++) {
        var element = this[i]
        result.push(expression(element, i, curray));
    };
    return result;
};

Curray.prototype.includes = function(value, index) {
    var start = 0;
    var end = this.length
    index === undefined ? start : start = index;

    for (var i = start; i < end; i++) {
        var element = this[i];
        var check = false || element === value;
        if (check === true) { return check; };
    };

    return check;
};

Curray.prototype.indexOf = function(value) {

    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        var check = false || element === value;
        if (check === true) { return i; };
    };

    return -1;
};

Curray.prototype.join = function(value) {
    value === undefined? value = ', ' : {};
    var result;
    var lastNum = this.length -1;
    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        if (i === 0) {
            result = element + value;
        } else if (i === lastNum) {
            result += element;
        } else {
            result += (element + value);
        }
    };

    return result;
};

Curray.prototype.lastIndexOf = function(value) {
    
    var lastNum = this.length - 1;

    for (var i = lastNum; i > -1; i--) {
        var element = this[i];
        var check = false || element === value;
        if (check === true) { return i; };
    };

    return -1;
};

Curray.prototype.reverse = function() {
    
    var result = new Curray();
    var lastNum = this.length - 1;

    for (var i = lastNum; i > -1; i--) {
        var element = this[i];
        result.push(element);
    };

    return result;
};

Curray.prototype.shift = function() {
    var first = this[0];
    delete this[0];
    return first;
};

Curray.prototype.slice = function(start, end) {
    var result = new Curray();

    for (var i = start; i < end; i++) {
        var element = this[i];
        result.push(element);
    };
    return result;
};

Curray.prototype.some = function(expression) {

    if (arguments.length === 0) throw TypeError('undefined is not a function');

    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        var check = false || expression(element, i, this);
        if (check === true) { return check; };
    };
    return check;
};

Curray.prototype.sort = function(expression) {
    
    if (!(expression instanceof Function)) throw TypeError(expression + ' is not defined');
    
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

Curray.prototype.splice = function() {
    var start = arguments[0];
    var deleteCount = arguments[1];
    var limit = start + deleteCount
    var curray = this;
    var currayCp = [];
    var currayRs = [];
    var values = [];
    var result = [];
    var count = 0;
    var count2 = 0;

    for (var i = 0; i < this.length; i++) {
        currayCp.push(this[i]);
    };

    if (arguments.length > 2) {
        for (var i = 2; i < arguments.length; i++) {
            values.push(arguments[i]);
        };

        if (arguments[1] === 0) {
            var newLength = arguments[0] + currayCp.length;
            for (var i = 0; i < newLength; i++) {
                if (i === arguments[0]) {
                    currayRs.push(values[count++]);
                } else {
                    currayRs.push(currayCp[count2++]);
                };
            };
            // Reconstruction curray father
            for (var i = 0; i < currayRs.length; i++) {
                this[i] = currayRs[i];
            };
            result = [];
            this['length'] = currayRs.length;
            return result;


        } else {
            // first remove the element from the array
            var newLength = (currayCp.length - deleteCount) + values.length;
            for (var i = 0; i < newLength; i++) {
                if (i >= start && i < limit) {
                    delete currayCp[count2++];
                    currayRs.push(values[count++]);
                } else {
                    currayRs.push(currayCp[count2++]);
                };
            };
            // Reconstruction curray father
            for (var i = 0; i < this.length; i++) {
                if (i < currayRs.length) {
                    this[i] = currayRs[i];
                } else {
                    delete this[i];
                };
            };
            result = values;
            this['length'] = currayRs.length;
            return result;
        };

    } else {
        for (var i = 0; i < this.length; i++) {
            var element = this[i]
            if (i >= start && i < limit) {
                result.push(curray[i]);
            } else {
                this[count++] = this[i];
            };
        };

        if (this.length !== count) {
            for (var i = count; i < this.length; i++) {
                var element = this[i]
                delete this[i];
            };
        };
        this['length'] = count;
        return result;
    };
};

Curray.prototype.unshift = function() {
    var elements = arguments;
    var result = this;
    var values = [];
    var arr = [];

    for (var i = 0; i < elements.length; i++) {
        values.push(elements[i]);
    };

    for (var i = 0; i < result.length; i++) {
        arr.push(result[i]);
    };

    var count = 0;
    var count2 = 0;

    var newLength = values.length + this.length;

    for (var i = 0; i < newLength; i++) {
        if (values.length > i) {
            this[i] = values[count++];
        } else {
            this[i] = arr[count2++]; 
        };
    };
    this['length'] = newLength;
    return newLength;
};

Curray.prototype.flat = function() {

    var depth = arguments[0];
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0 ? 0 : depth;
 
    var result = [];
 
    for (var i = 0; i < this.length; i++) {
        var element = this[i];
 
        if (element instanceof Array && depth > 0) {
            var arr = element.flat(depth - 1);
 
            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }
 
    return result;
 };



Curray.prototype.reduce = function(expresion) {
    var value = 0;
    for (var i = 1; i < this.length; i++) {
        var count = i - 1
        if (i === 1) {
            value = expresion(this[count], this[i], i, this);
        } else {
            value = expresion(value, this[i], i, this);
        }
    }
    return value;
}

Curray.prototype.reduceRight = function(expresion) {
    var curray = this
    var value = 0;
    for (var i = this.length - 2; i >= 0; i--) {
        var count = this.length - 1
        var a = this[count]
        var b = this[i]
        var c = i
        var d = this

        if (i === this.length - 2) {
            value = expresion(this[count], this[i], i, this);
        } else {
            value = expresion(value, this[i], i, this);
        }
    }
    return value;
}

Curray.prototype.fill = function(value, start, end){

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function fill');
      
      var i=0;
      var j=0;
      
      if (end){
          j=start;
          for (j; j<end; j++){
            this[j]=value;
          }
          return this;
      } else if (start){
          i=start;
          for (i; i<this.length-1; i++){
              this[i]=value;
          }
          return  this;
      } else {
          for (var i=0; i<this.length-1; i++){
            this[i]=value;
          }
        return  this;
      }
};

Curray.prototype.filter = function (expression){

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function filter');

    var newarray=[];
    var j=0;

        for(var i=0;i<this.length;i++) {
            if(expression(this[i])){
                newarray[j]=this[i];
                j++;
            }
        }  return newarray;
};

Curray.prototype.findIndex = function(expression){

    if (arguments.length === 0) throw TypeError('undefined is not a function');

    for (var i=0; i<this.length; i++){
        if(expression(this[i])){
           
            return i;

        }

    }
    return undefined;
};