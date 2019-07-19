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
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');

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

Curray.prototype.fill =function(value,start,end){
    if (this.length === 0) throw TypeError(' debe contener al menos un array y un caracter');
/*    if (!(this instanceof Array)) throw TypeError(' necesita que el primer parámetro sea un array’'); 
 */   if (end) {
       for (var i = start; i < end; i++) {
           this[i] = value;
       }
   } else if (start) {
       for (var i = start; i < this.length; i++){
           this[i] = value;
       }
   } else {
       for (i = 0; i< this.length; i++){
           this[i] = value;
       }
   }
   return this;
};

Curray.prototype.unshifty=function(){
/*     if (!(arr instanceof Array)) throw TypeError('unshifty necesita que el primer parámetro sea un Array');
 */
    var inc = arguments.length - 1
    var length = this.length
    for (var i = length - 1; i >= 0; i--){
        this[i + inc] = this[i]
    }
    for (var j = 1; j < arguments.length; j++)
        this[j - 1] = arguments[j]

    return this.length
};

Curray.prototype.flat=function(depth){
/*     if (!(array instanceof Array)) throw TypeError(array + ' is not an array');
 */
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0? 0 : depth;

    var result = [];

    for (var i = 0; i < this.length; i++) {
        var element = this[i];

        if (element instanceof Curray && depth > 0) {
            var arr = this[i].flat(element, depth - 1);

            for (var j = 0; j < arr.length; j++) result.push(this[j]);
        } else result.push(element);
    }

    return result;

}

Curray.prototype.toString= function(){
    if(this.length===0) throw TypeError("No se puede leer la propiedad length de undefined");
    if(this.length===null) throw TypeError("No se puede convertir a string un objeto null");

    var newString= "";
    if(typeof this === "string"){
        newString=this;
    }else{
        for(var i=0; i<this.length; i++){
            newString=newString+this[i]+",";
        };
        newString=newString.substring(0,(newString.length-1))
    }
    return newString;
}










