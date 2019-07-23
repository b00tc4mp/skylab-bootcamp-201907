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
        };
        this.length = arguments.length;
    };
};

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

Curray.prototype.toString = function(){
    if (this.length === 0) throw TypeError('No se puede leer la propiedad "length" de undefined');
    if (this.length === null) throw TypeError ('No se puede convertir a string un objeto null');

    var newstring = '';

    if (typeof this === 'string'){
        newstring = this;
    } else {
        for (var i = 0; i < this.length; i++){
            newstring = newstring + this[i] + ',';
        };
        newstring = newstring.substring(0, (newstring.length-1));
    }
    return newstring;
}

Curray.prototype.fill = function(value, start, end){
    if (this.length === 0) throw TypeError('fill debe contener al menos un parámetro');

    if (typeof end === 'number') {
        for (var i = start; i < end; i++) {
            this[i] = value;
        }
    } else if (typeof start === 'number') {
        for (var i = start; i < this.length; i++){
            this[i] = value;
        }
    } else {
        for (i = 0; i< this.length; i++){
            this[i] = value;
        }
    }
    return this;
}

Curray.prototype.flat = function(depth){

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

Curray.prototype.map = function(expression) {

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function map');

    var result= this;

    for (var i = 0; i < this.length; i++)
        result[i] = expression(this[i], i, this);

    return result;
};

Curray.prototype.unshift = function(element){
    var inc = arguments.length;
    var length = this.length;

    for (var i = length - 1; i >= 0; i--){
        this[i + inc] = this[i]
    };
    for (var j = 0; j < arguments.length; j++){
        this[j] = arguments[j]
    };
    
    this.length += inc;
    return this;
};

Curray.prototype.filter=function(expression){
    if(this[0]===undefined) throw TypeError("No se puede convertir a string un objeto null");

    var newarray = [];
    var j = 0;
    for(var i = 0; i < this.length; i++){
        if(expression(this[i])){
            newarray[j]=this[i];
            j++;
        };
    };
    return newarray;
    
    
};


Curray.prototype.copyWithin=function(target,start,end){
    var newArray = [];
    var count = 0;
    for(var i = start; i < end; i++){
        newArray.push(this[i]);
    };

    for(var i=0; i<newArray.length;i++){
        this[target] = newArray[count];
        count++;
        target++;
    };
};

Curray.prototype.map=function(expression){
    if(!(expression)) throw TypeError('missing argument 0 when calling function map');

    var result = [];
    for(var i=0; i<this.length;i++)
        result[i] = expression(this[i],i,this);
    return result;

};

Curray.prototype.join = function(separator) {
    var accumulator = '';
    if (arguments.length === 0) separator = ",";
    if (!(separator instanceof String)) separator = separator.toString();
    for (var i=0; i<this.length; i++) {
            if (this[i] === undefined || this[i] === null) this[i] = '';
            if (i === (this.length -1)) accumulator += this[i];
            else accumulator += this[i] + separator;
        };
    return accumulator;
};
 
Curray.prototype.entries=function(iterator){
    var i = iterator -1;
    var result=[];
    if(i !== this.length){
        result[0]= i + "," + this[i];
    };
    return result;
};

Curray.prototype.every = function(expression){
    var result;
    for(var i = 0; i < this.length; i++){
        if(expression(this[i]) != true && result !=true){
            result = false;
        }else{
            result = true;
        };
    };
    return result;
};

Curray.prototype.indexOf = function(value){
    var result;
    for(var i in this){
        if(this[i] === value){
        result = i;
            break;
        } else {
        result = -1;
        };
    };
    return result;
};

Curray.prototype.sliceTest = function(begin,end){
    if (this.length === 0) throw TypeError('missing argument 0 when calling function slice');

        begin = Math.abs(begin);
        end = Math.abs(end);
        var result=[];
        for(var i = begin; i < end ; i++){
            result.push(this[i]);
        };
    return result;
};


Curray.prototype.reduce = function(expression, initialValue){

    var reduction;
    var result;

    if(initialValue){
        reduction = expression(initialValue, this[0]);
        for(var i = 0; i < this.length; i++){
            if (this[i+1] === undefined) {
                continue
            } else {
                reduction = expression(reduction, this[i+1]);
            };
        };
        result = reduction;

    } else {reduction = this[0];
        reduction = this[0];
        for(var i = 0; i < this.length; i++){
            if (this[i+1] === undefined) {
                continue
            } else {
                reduction = expression(reduction, this[i+1]);
            };
        };
        result = reduction;
    };

    return result;
};

Curray.prototype.reduceRight = function (expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function reduceRight');
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

    var newArray = [];
    for (var i = this.length - 1; i >= 0; i--) {
        newArray = expression(newArray, this[i]);
    };
    return newArray;
};

Curray.prototype.concat = function(curray){
    if(arguments.length === 0) throw ReferenceError('missing argument 0 when calling function concat');
    if(!(curray instanceof Curray)) throw TypeError('param is not Curray');
    if(this.length==0) throw ReferenceError('Curray is empty');
    
    var res=this;//se refiere al this del Curray cuando lo creamos ejemplo: c.concat(a) siendo c un Curray()
    for(var i=0;i<curray.length;i++){
        res[this.length++]=curray[i];
    };
    return res;
};

Curray.prototype.arrayOf = function () {
    var curray = [];

    for (var i = 0; i < this.length; i++) {

        curray.push(this[i]);

    }

    return curray;
};

Curray.prototype.splice = function (start, remove, add1, add2) {

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
                    };
                };
            } else if (x-- === 1) {
                if (add1 != 0) {
                    newArray[n++] = add1;
                    add1 = 0;
                    if (add2 != 0) {
                        newArray[n++] = add2;
                        add2 = 0;
                    };
                };
            };
        } else if (this.length > start + remove) {
            newArray[n++] = array[i];
        };
    };
    return newArray;
};

Curray.prototype.sort = function (expression) {

    var sorted = [this[0]]
    expression = expression || function (a, b) {
        return String(a) >= String(b);
    };

    for (var i = 1; i < this.length; i++) {
        var indexToInsert = 0;
        for (var j = 0; j < sorted.length; j++) {
            if (expression(this[i], sorted[j])) {
                indexToInsert = j + 1;
            } else {
                break;
            };
        };
        sorted.splice(indexToInsert, 0, this[i])
    };
    return sorted;
};

Curray.prototype.lastIndexOf = function (element) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function lastIndexOf');

    for (var i = this.length + 1; i > 0; i--) {
        if (this[i] === element) {
            return i;
        };
    };
    return -1;
};

Curray.prototype.find = function (expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function find');

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            return this[i];
        };
    };
};

Curray.prototype.some = function (expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function some');
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i]) === true) {
            return true;
        };
    };
    return false;
};

Curray.prototype.shift = function () {

    var first = this[0];
    for (var i = 1; i < this.length; i++) {
        this[i - 1] = this[i];
    };
    this.length = this.length - 1;
    return first;
};

Curray.prototype.reverse = function () {

    for (var i = 0; i <= Math.floor((this.length - 1) / 2); i++) {
        var a = this[i];
        this[i] = this[this.length - 1 - i];
        this[this.length - 1 - i] = a;
    };
    var realrray = Array.from(this);
    return realrray;
};

Curray.prototype.includes = function (value) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function includes');

    for (var i = 0; i < this.length; i++) {
        var test = false;

        if (this[i] == value) {
            test = true;
        };
    };
    return test;
};