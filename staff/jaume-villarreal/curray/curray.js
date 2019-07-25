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

Curray.prototype.every = function(expression){
    if(!arguments.length) throw TypeError(expression + " is not a function")
    for(var i =0 ; i<this.length ; i++){
        if(expression(this[i]) === false) return false;
    }
    return true;
};

//fill
Curray.prototype.fill = function(value,start,end){
    
    if (arguments.length){    
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
                end = this.length + (end);
            }
        } else{
            end = this.length;
        }

        for(var i = start ; i<end ; i++){
            this[i] = value;
        }
    }
    return this;
};

// filter
Curray.prototype.filter = function(expression){
    var filtered = new Curray();
    for(var i=0 ; i<this.length; i++){
        if(expression(this[i])) filtered.push(this[i])
    }
    return filtered;
}

// forEach
Curray.prototype.forEach = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};

// includes
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

// indexOf
Curray.prototype.indexOf = function(value) {

    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        var check = false || element === value;
        if (check === true) { return i; };
    };

    return -1;
};

// join
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

// lastIndexOf
Curray.prototype.lastIndexOf = function(value) {
    
    var lastNum = this.length - 1;

    for (var i = lastNum; i > -1; i--) {
        var element = this[i];
        var check = false || element === value;
        if (check === true) { return i; };
    };

    return -1;
};

// map
Curray.prototype.map = function(expression) {
    // if (!(array instanceof Array)) throw TypeError(array + ' is not an array');

    var curray = this;
    var x = this.length;
    var result = new Curray();
    for (var i = 0; i < x; i++) {
        var element = this[i]
        result.push(expression(element, i, curray));
    };
    return result;
};

// reduce
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

// reduceRight
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

// reverse
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

// slice
Curray.prototype.slice = function(start, end) {
    var result = new Curray();

    for (var i = start; i < end; i++) {
        var element = this[i];
        result.push(element);
    };
    return result;
};

// some
Curray.prototype.some = function(expression) {

    for (var i = 0; i < this.length; i++) {
        var element = this[i];
        var check = false || expression(element, i, this);
        if (check === true) { return check; };
    };
    return check;
};

// sort
Curray.prototype.sort = function(expression) {
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

// splice
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

// unshift
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