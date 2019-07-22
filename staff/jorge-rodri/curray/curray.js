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

Curray.prototype.concat = function(curray){
    if(arguments.length === 0) throw ReferenceError('missing argument 0 when calling function concat')
    if(!(curray instanceof Curray)) throw TypeError('param is not Curray');
    if(this.length==0) throw ReferenceError('Curray is empty');
    
    var res=this;//se refiere al this del Curray cuando lo creamos ejemplo: c.concat(a) siendo c un Curray()
    for(var i=0;i<curray.length;i++){
        res[this.length++]=curray[i];
    }
    return res;
}

Curray.prototype.isCurray = function(){
    if(this instanceof Curray) return true; else return false;
}

Curray.prototype.every = function(expression){
    var res;
    for(var i=0;i<this.length;i++){
        if(expression(this[i])){
            res=true;
        }else{
            res=false;
            break;
        }
    }
    return res;
}

Curray.prototype.fill = function(value, start, end){
    if(start===undefined)
        start=0;
    if(end===undefined)
        end=this.length;
    for(var i=start;i<end;i++){
        this[i]=value;
    }
    return this;
}

Curray.prototype.map = function(expression) {

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function map');

    var result= this;

     for (var i = 0; i < this.length; i++)
         result[i] = expression(this[i], i, this);

     return result;
 }

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

Curray.prototype.find = function(expresion){
    for(var i=0;i<this.length;i++){
        if(expresion(this[i])){
            return this[i]
        }
    }
}

Curray.prototype.findIndex = function(expresion){
    for(var i=0;i<this.length;i++){
        if(expresion(this[i])){
            return i;
        }
    }
}

Curray.prototype.includes = function(a){
    for(var i=0;i<this.length;i++){
        if(a.toString()==this[i].toString()){
            return true;
        }
    }
    return false
}

Curray.prototype.unshift = function(){
    var inc=arguments.length;
    var length=this.length-1;
    this.length+=arguments.length;

    for(var i=length;i>=0;i--){
        this[i+inc]=this[i];
    }
    for(var i=arguments.length-1;i>=0;i--){
        this[i]=arguments[i]
    }
    return this.length;
}

Curray.prototype.reduce = function(expresion){
    var result=0;
    var count=0;
    for(var i=1;i<this.length;i++){
        count=expresion(this[i-1],this[i],i,this)
        result=count;
        this[i]=count
    }
    return result
}

Curray.prototype.copyWithin = function (target, start) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function copyWithin');

    this[target] = this[start];
    return this;
};

Curray.prototype.arrayOf = function () {
    var result = [];

    for (var i = 0; i < this.length; i++) {

        result.push(this[i]);

    }

    return result;
}

Curray.prototype.join = function (pivot) {
    var result = "";

    if (!(this instanceof Curray)) {
        throw TypeError("This is not a Curray");
    }
    if (arguments.length === 0) {
        pivot = ",";
    }
    if (!(pivot instanceof String)) {
        pivot = pivot.toString();
    }

    for (var i = 0; i < this.length; i++) {
        if (this[i] === null || this[i] === undefined) {
            arr[i] = " ";
        }

        if (i === (this.length - 1)) {
            result += this[i];
        } else {
            result += this[i] + pivot;
        }
    }
    return (result);
};

Curray.prototype.splice = function (start, remove, add1, add2) {

    var n = 0;
    var x = remove;
    var result = [];

    for (var i = 0; i < this.length; i++) {
        if (i < start) {
            result[n++] = this[i];
        } else if (x >= 0) {
            if (x === 0) {
                result[n++] = this[i];
                if (add1 != 0) {
                    result[n++] = add1;
                    add1 = 0;
                    if (add2 != 0) {
                        result[n++] = add2;
                        add2 = 0;
                    }
                }
            } else if (x-- === 1) {
                if (add1 != 0) {
                    result[n++] = add1;
                    add1 = 0;
                    if (add2 != 0) {
                        result[n++] = add2;
                        add2 = 0;
                    }
                }
            }
        } else if (this.length > start + remove) {
            result[n++] = array[i];
        }
    }
    return result;
};

Curray.prototype.sort = function (expression) {

    var result = [this[0]]
    expression = expression || function (a, b) {
        return String(a) >= String(b);
    }

    for (var i = 1; i < this.length; i++) {
        var indexToInsert = 0
        for (var j = 0; j < result.length; j++) {
            if (expression(this[i], result[j])) {
                indexToInsert = j + 1;
            } else {
                break
            }
        }
        result.splice(indexToInsert, 0, this[i])
    }
    return result;
};

Curray.prototype.slice = function (first, last) {
    if (typeof first !== 'number' && last !== undefined) throw new TypeError(first + ' is not a number');
    if (typeof last !== 'number' && last !== undefined) throw new TypeError(last + ' is not a number');

    var result = [];
    var negative = -Math.abs(first)
    if (first === -Math.abs(first) && last === undefined) {
        var positive = Math.abs(negative);
        for (i = this.length - positive; i < this.length; i++) {
            result.push(this[i]);
        }
    } else if (first === Math.abs(first) && last === undefined) {
        for (i = first; i < this.length; i++) {
            result.push(this[i]);
        }
    } else if (first === undefined && last === undefined) {
        for (i = 0; i < this.length; i++) {
            result.push(this[i]);
        }
    } else {
        for (i = first; i < last; i++) {
            result.push(this[i]);
        }
    }
    return result;
};

Curray.prototype.reduceRight = function (expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function reduceRight');
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

    var newArray = []
    for (var i = this.length - 1; i >= 0; i--) {
        newArray = expression(newArray, this[i]);
    }
    return newArray;
};

Curray.prototype.filter = function (expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function filter');
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

    var result = [];
    var j = 0;

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            result[j] = this[i];
            j++;
        }
    }
    return result;
};

Curray.prototype.some = function (expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0');
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i]) === true) {
            return true;
        }
    }
    return false;
};

Curray.prototype.shift = function () {

    var first = this[0];
    for (var i = 1; i < this.length; i++) {
        this[i - 1] = this[i];
    }
    this.length = this.length - 1;
    return first;
};

Curray.prototype.reverse = function () {

    for (var i = 0; i <= Math.floor((this.length - 1) / 2); i++) {
        var ele = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = ele;
    }
    var result = Array.from(this);
    return result;
};


