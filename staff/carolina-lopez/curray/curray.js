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

Curray.prototype.includes = function(value) {
    for(var i = 0; i < this.length; i++){
        var test = false;
        
        if(this[i] == value){
            test = true;
        }
    }
    return test;
};

Curray.prototype.map = function(expression) {
    var result = new Curray();

    for(var i = 0; i < this.length; i++){
        result.push(expression(this[i], i, this));
    }
    return result;
};

Curray.prototype.indexof = function(value){
    for(var i = 0; i < this.length; i++){
        if(value === this[i]){
            return i;
        } else if (i == this.length-1 || name == undefined) {
            return -1;
        }
    }
};

Curray.prototype.join = function(separator){
    var string = '';
    if(separator == '' || separator == undefined) {
        separator = ',';
    }

    if (this.length == 1){
        string = this[0];
        return string;
    } else {
        for (var i = 0; i < this.length; i++) {
            if (i == this.length -1) {
                string += this[i];
            } else {
                string += this[i] + separator;
            }
        }
        return string;
    }
};

Curray.prototype.concat = function(element) {

    for(var i = 0; i < element.length; i++){
        this[this.length + i] = element[i];
        length ++;
    }
    return this;
}

Curray.prototype.every = function (value) {
    for(var i = 0; i < this.length; i++){
        if(this[i] === value){
            return true;
        } else {
            return false;
        }
    }
}

function flat(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
  
    var depth = arguments[1];
    depth = typeof depth === 'undefined'? 1 : depth;
  
    var result = [];
  
    for (var i = 0; i < array.length; i++) {
        var element = array[i];
  
            if (element instanceof Array && depth > 0) {
                var arr = flat(element, depth - 1);
  
                for (var j = 0; j < arr.length; j++) result.push(arr[j]);
            } else result.push(element);
    }
  
    return result;
}

Curray.prototype.flat = function(depth){

    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0? 0 : depth;

    var result = new Curray;

    for (var i = 0; i < this.length; i++) {
        var element = this[i];

        if (element instanceof Curray && depth > 0) {
            var arr = this[i].flat(element, depth - 1);

            for (var j = 0; j < arr.length; j++) 
                result.push(arr[j]);

        } else result.push(element);
    }return result;   
}

Curray.prototype.lastIndexOf = function (value, io) {

    for(var i = this.length; i >= 0; i--){
        if(this[i] === value) {
            return i;
        }
    } return -1;
}

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

Curray.prototype.reverse = function(){
    for(var i = 0; i <= Math.floor((this.length-1)/2); i++){
        var a = this[i];
        this[i] = this[this.length -1 -i];
        this[this.length -1 - i]  = a;   
    } return this;
} 

Curray.prototype.shift = function(){
    var first = this[0];
    for(var i = 1; i < this.length; i++){
        this[i-1] = this[i];
    }
    this.length = this.length -1;
    return first;
}

Curray.prototype.slice = function(first, last){
    var cut = new Curray();
    var negative = -Math.abs(first)

    if(first === negative && last === undefined) {
        var positive = Math.abs(negative);
        for(var i = this.length-positive; i < this.length; i++){
            cut.push(this[i]);
        }
    } else if (first === Math.abs(first) && last === undefined) {
        for(var i = first; i < this.length; i++){
            cut.push(this[i]);
        }
    } else {
        for(var i = first; i < last; i++) {
            cut.push(this[i]);
        }
    } return cut;
}

Curray.prototype.some = function(expression){
    
    for(var i = 0; i < this.length; i++){
        if(expression(this[i]) === true){
            return true;
        }
    }
    return false;
}

/* Curray.prototype.sort = function(){

} */

Curray.prototype.splice = function(){
    
}
