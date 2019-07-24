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

Curray.prototype.pop = function () {
    var last = this[--this.length];this.length + arguments.length;

    delete this[this.length];
    return last;
};

Curray.prototype.forEach = function (expression) {
    if (arguments.length === 0) throw TypeError('missing argument ');

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};

Curray.prototype.concat = function (curray2) {

    var concat = new Curray;

    for (var i = 0; i < this.length; i++) {
        concat.push(this[i]);
    }
    for (var i = 0; i < curray2.length; i++) {
        concat.push(curray2[i]);
    }
    return concat;
};

Curray.prototype.flat = function (depth) {
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0 ? 0 : depth;
    var result = [];

    for (var i = 0; i < this.length; i++) {
        var element = this[i];

        if (element instanceof Curray && depth > 0) {
            var curr = this[i].flat(depth - 1, element);

            for (var j = 0; j < curr.length; j++) {
                result.push(curr[j]);
            }
        } else result.push(element);
    }

    return result;
};

Curray.prototype.copyWithin = function (target, start) {
    if (arguments.length === 0) throw TypeError('missing argument');

    this[target] = this[start];
    return this;
};

Curray.prototype.map = function (expression) {

    if (arguments.length === 0) {
        throw TypeError('missing argument');
    }
    var result = new Curray();

    for (var i = 0; i < this.length; i++)
        result.push(expression(this[i]));

    return result;
};

Curray.prototype.every = function (expression) {

    for (var i = 0; i < this.length; i++) {
        if (!expression(this[i])) {
            return false;
        } 
        else continue;   
    } 
    return true;
};

Curray.prototype.fill = function (value, start, end) {

    if (arguments.length === 0) throw TypeError('missing argument');
    var i = 0;
    var j = 0;

    if (end) {
        j = start;
        for (j; j < end; j++) {
            this[j] = value;
        }
        return this;
    } else if (start) {
        i = start;
        for (i; i < this.length - 1; i++) {
            this[i] = value;
        }
        return this;
    } else {
        for (var i = 0; i < this.length - 1; i++) {
            this[i] = value;
        }
        return this;
    }
};

Curray.prototype.join = function(separador){
    var count = "";

    if (arguments.length === 0){
        separador = ",";
    }
    if (!(separador instanceof String) ){
        separador = separador.toString();
    }

    for(var i = 0; i < this.length; i++){
        if(this[i] === null || this[i] === undefined){
            arr[i] = " ";
        }
        if(i === (this.length -1)){
            count += this[i];
        }
        else{
            count += this[i] + separador;
        }
    }
    return (count);
};

Curray.prototype.some = function(curr, expresion){
    if(!(this instanceof Curray)) {
        throw TypeError("This is not a Curray");
    }
    for(var i = 0; i < curr.length; i++){
        if(expresion(curr[i])){
            return true;
        }
        else{
            continue;
        }
    }
    return false;
};

Curray.prototype.reduce = function(expresion){
    var result = null;

    for(var i = 0; i < this.length; i++){
        result += expresion(this[i]);
    }
    return result;
};

Curray.prototype.from = function(expresion){
    var result = new Curray();
 
    if (expresion === undefined){
        for(var i = 0; i < this.length; i++){
            result.push(this[i]);
        }
        return result;
    }

    for(var i = 0; i < this.length; i++){
        result.push(expresion(this[i]));
    }
    return result;
};

Curray.prototype.filter = function filter(expresion){
    var result = new Curray();

    for(var i = 0; i < this.length; i++){
        if(expresion(this[i])){
            result.push(this[i]);
        }
    }
    return result;
};

Curray.prototype.includes = function includes (argument, index){

    if(!(this instanceof Curray)) {
        throw TypeError("This is not an array");
    }
    if (index === undefined){
        index = 0;
    }
    if (index < 0){
        index = this.length + index;
    }

    for(var i = index; i < this.length; i++){

        if(argument === this[i]){
            return true
        } 
        else continue;   
    }
    return false;
};

Curray.prototype.isCurray = function isCurray(){
    if (this instanceof Curray){
        return true;
    }
    else return false;
// if its not true it will throw error (its not a function)
};

Curray.prototype.unshift = function unshift(){
    var increment = arguments.length;
  
    for (var i = this.length -1; i >= 0; i--){
        this[i + increment] = this[i];
    }   
    for (var j = 0; j < arguments.length; j++){
        this[j] = arguments[j];
    }
    
    return this.length + arguments.length;;
};
