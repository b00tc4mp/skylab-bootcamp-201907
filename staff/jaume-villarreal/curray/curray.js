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
    if(!(expression instanceof Function)) throw TypeError(this + " is not a function");

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

//from
Curray.prototype.from = function(element , expression){
    if(!arguments.length) throw TypeError("Cannot convert undefined or null to object");
    
    var arrayFrom = [];
    
    if(!(typeof element === "string" || element instanceof Curray)){
        arrayFrom = [];
    }
    else{
        if(arguments[1] instanceof Function){
            for(var i = 0 ; i<element.length ; i++){
                arrayFrom[i] = expression(element[i]);
            }
        }
        else{
            for(var i = 0 ; i < element.length ; i++){
                arrayFrom[i] = element[i];
            }
        }
    }

    return arrayFrom;
};


//isArray
Curray.prototype.isCurray = function(element){
    return element instanceof Curray;
};

//copyWithin
Curray.prototype.copyWithin = function(target,start,end){
    var copy = new Curray();
    for(var i = 0 ; i<this.length ; i++){
        copy.push(this[i]);
    };

    if (arguments.length){
        //set target
        target = Math.sign(target) === 1
                    ? target
                    : this.length + target;
        
        //set start
        if(typeof start === "number"){
            if(Math.sign(start) === -1){
                start = this.length + start;
            }
        } else{
            start = 0;
        }
        
        //set end
        if(typeof end === "number"){
            if(Math.sign(end) === -1){
                end = copy.length + (end-1);
            }
            else{
                end--;
            }   
        } else{
            end = copy.length-(start-1);
        }

        for(var i = target ; i<end ; i++){
            this[i] = copy[start++];
        }
    }
    return this;
};

