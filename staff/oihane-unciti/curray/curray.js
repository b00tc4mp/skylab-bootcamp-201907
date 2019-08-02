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

Curray.prototype.flat = function(depth) {
    
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0? 0 : depth;

    var result = [];

    for (var i = 0; i < this.length; i++) {
        var element = this[i];

        if (element instanceof Curray && depth > 0) {
            var arr = this[i].flat(depth - 1, element);

            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }

    return result;
}

Curray.prototype.copyWithin = function(target, start) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function copyWithin');

    // if (!(curray instanceof Curray)) throw TypeError("1 is not an array");

        this[target] = this[start];
        return this;
};

 Curray.prototype.map = function(expression) {

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function map');

    var result= this;

     for (var i = 0; i < this.length; i++)
         result[i] = expression(this[i], i, this);

     return result;
 }

 Curray.prototype.arrayOf = function () {
    var curray = [];

    for (var i = 0; i < this.length; i++) curray.push(this[i]);

    return curray;
}

Curray.prototype.every = function (expression) {
    var result = true;
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i]) && result == true) return true;
        else return false;
    }
    return result;
}

Curray.prototype.find = function (value){
    var result = []
    for (var i = 0; i < this.length; i++) {
        if (this[i] > value) {
            result.push(this[i]);
        }
    }
    return result;
}

Curray.prototype.filter = function (expression, value){
    var result = []
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            result.push(this[i]);
        }
    }
    return result;

} 

Curray.prototype.findIndex = function (value){
    var result=0;
    for (var i = 0; i < this.length; i++) {
        if (this[i]<value) {
            result++
        }
    }
    if (result == 0) {
        result = -1;
    }

    return result;
}

Curray.prototype.includes = function (value){
    var result = false ;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == value) {
            result = true;
        } 
    }
    return result;
}

Curray.prototype.indexOf = function (value){

    for(var i = 0; i <= this.length; i++){
        if(this[i] === value){
            return i;
        }
    }
    return -1;
}

Curray.prototype.join = function (separator = ","){
    var result = "";
    for (var i = 0; i < this.length; i++) {
        if(i!=0){
          result+= separator + this[i];  
        }  else{
            result+= this[i];
        }     
    } 
    return result;  
}

Curray.prototype.lastIndexOf = function (value){
    var result = 0;
    for (var i = 0; i < this.length; i++) {
        if(this[i]=== value){
          result = i; 
        } 
    }
    if(result != 0){
        return result;
    }else{
        return -1
    }   
} 

Curray.prototype.reduce = function (acc){
    var result = 0;
    for (var i = 0; i < this.length; i++) {
        result += this[i];
    } 
    return result;  
} 

Curray.prototype.reverse = function (){
    var result = "";
    for (var i = this.length-1 ; i>=0; i--) { 
        if(i != 0){
            result += this[i] + ",";
        }else if (i == 0){
            result += this[i];
        }
    } 
    return result;  
}  

Curray.prototype.shift = function (){
    var result = "";
    var newCurray = "";
    for (var i = 0; i < this.length; i++) { 
        if(i != 0){
           newCurray += this[i];
        }else if (i == 0){
            result = this[i];
        }
    } 
    return result;  
}  

Curray.prototype.slice = function (start, end){
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function slice');

    var result = "";
    for (var i = start; i < end; i++) { 
        result += this[i];
    } 
    return result;  
}  


