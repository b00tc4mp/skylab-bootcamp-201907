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

Curray.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++){
        this[this.length++] = arguments[i];
    }
    
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

Curray.prototype.join = function(separador){
    var count = "";

    if(!(this instanceof Curray)) {
        throw TypeError("This is not a Curray");
    }
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

Curray.prototype.concat = function(arguments) {
    var curray = [];

    for (var i = 0; i < arguments.length; i++) {
        for (j = 0; j < arguments[i].length; j++) {
            curray += this[i][j];
        }
    }
    curray = curray.split("");

    return (curray);
};
