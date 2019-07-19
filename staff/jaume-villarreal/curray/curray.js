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


//push
Curray.prototype.push = function (element) {
    this[this.length++] = element;

    return this.length;
};

//pop
Curray.prototype.pop = function() {
    var last = this[--this.length];

    delete this[this.length];

    return last;
};


//forEach
Curray.prototype.forEach = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};


//entries
Curray.prototype.entries = function(){
    var result = [];
    for (var i = 0 ; i<this.length ; i++){
        result[i] = [i,this[i]];
    }
    return result;   
};

//find
Curray.prototype.find = function(expression){
    if(!arguments.length) throw TypeError ("undefined is not a function");
    if(!(expression instanceof Function)) throw TypeError(expression + " is not a function");
    
    for(var i = 0 ; i<this.length ; i++){
        if(expression(this[i])) return this[i];
    }
    return undefined;
};

// findIndex
Curray.prototype.findIndex = function(expression){
    if(!arguments.length) throw TypeError ("undefined is not a function");
    if(!(expression instanceof Function)) throw TypeError(this + "is not a function");

    for(var i = 0 ; i<this.length ; i++){
        if(expression(this[i])) return i;
    }
    return undefined;
}

// concat
Curray.prototype.concat = function(){
    if(!(this instanceof Curray)) throw TypeError ("expression is not a function");

    var concat = new Curray();

    for(var i = 0 ; i < this.length ; i++){
        concat.push(this[i])
    }
    
    if (arguments.length > 0){
        for(var i = 0; i < arguments.length; i++){
            var item = arguments[i];

            if(item instanceof Curray){
                for(var j = 0; j <  item.length; j++){
                    concat.push(item[j]);
                }
            }else{
                concat.push(item)
            }
        }
    }

    return concat;
};