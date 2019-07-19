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
    /* array='hola mundo'
    array[array.length++] = element;
 */
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



Curray.prototype.fill = function(value, start, end){

      if (arguments.length === 0) throw TypeError('missing argument 0 when calling function fill');
        
        var i=0;
        var j=0;
        
        if (end){
            
            j=start;
        
            for (j; j<end; j++){
            
                 this[j]=value;
        
            }
            return this;
            
        } 

        else if (start){
           
            i=start;
        
            for (i; i<this.length-1; i++){
                this[i]=value;
            }

            return  this;

        } else   
            {
            for (var i=0; i<this.length-1; i++){
            
                this[i]=value;

            }

            return  this;
        }

};


Curray.prototype.filter = function (expression){
        
    
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function filter');
       
    
    var newarray=[];
    var j=0;

        for(var i=0;i<this.length;i++) {

            if(expression(this[i])){
                
                newarray[j]=this[i];
                
                j++;

            }
        }  return newarray;

    

};


Curray.prototype.every = function (expression){

    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function every');
    
    for(var i=0;i<this.length;i++) {
        if(!expression(this[i])){
     
            return false;

        } 
    }
    return true;
};