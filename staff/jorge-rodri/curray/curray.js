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