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

Curray.prototype.concat = function (curray2) {
    var currayConcat=new Curray;
    for(var i=0; i<this.length; i++){
        currayConcat.push(this[i]);
    }
    for(var i=0; i<curray2.length; i++){
        currayConcat.push(curray2[i]);
    }
    
    return currayConcat;
} 

 Curray.prototype.flat= function (curray) {

    var depth = arguments[1];
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0? 0 : depth;

    var result = new Curray;
    var resultCurray=[];

    for (var i = 0; i < this.length; i++) {
        var element = this[i];

        if (element instanceof Array && depth > 0) {
            var arr = (element).flat(depth - 1);

            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);

    }
    if (result instanceof Array) {
        resultCurray.push(Array.from(result))
    console.log(resultCurray)
    return result;
}

/* 
function flat(array) {
    if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var depth = arguments[1];
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0? 0 : depth;

    var result = [];

    for (var i = 0; i < array.length; i++) {
        var element = array[i];

        if (element instanceof Array && depth > 0) {
            var arr = flat(element, depth - 1);

            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }

    return result;
} */






/*
Curray.prototype.arrayConcat=function(a){
    var arr = [];
    for (var i = 0; i < arguments.length; i++) {        
        if (arguments[i] instanceof Object && !(arguments[i] instanceof Array)) {
            arr.push(arguments[i])
        }else
        switch (arguments[i].toString()) {
            case 'NaN':
                arr.push(NaN);
                
                break;
            case 'true':
                arr.push(true);
                break;
            case 'false':
                arr.push(false);
                break;
        }
        for (var j = 0; j < arguments[i].length; j++) {
            if (arguments[i][j] instanceof Array) {
                var r = arrayConcat(arguments[i][j]);
                for (var x = 0; x < r.length; x++) arr.push(r[x]);
            } else {
                arr.push(arguments[i][j]);
            }
        }
    }
    return arr;
} */
