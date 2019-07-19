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
        newstring = newstring.substring(0, (newstring.length-1))
    }
    return newstring;
}

Curray.prototype.fill = function(value, start, end){
    if (this.length === 0) throw TypeError('fill debe contener al menos un parámetro');
    // if (!(this instanceof Array)) throw TypeError('filljuan necesita que el primer parámetro sea un array');
    // if (start && typeof start !== 'number') throw TypeError('la posición inicial debe ser un número entero válido');
    // if (end && typeof end !== 'number') throw TypeError('la posición final debe ser un número entero válido');

    // var newArray = this;
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