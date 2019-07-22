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

Curray.prototype.pushTest = function (element) {
    if (this.length === 0) throw TypeError('missing argument 0 when calling function push');

    this[this.length++] = element;

    return this.length;
};

Curray.prototype.pop = function() {
    if (this.length === 0) throw TypeError('missing argument 0 when calling function pop');

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

Curray.prototype.toString= function(){
    if(this.length===0) throw TypeError("No se puede leer la propiedad length de undefined");
    if(this.length===null) throw TypeError("No se puede convertir a string un objeto null");

    var newString= "";
    if(typeof this === "string"){
        newString=this;
    }else{
        for(var i=0; i<this.length; i++){
            newString+=this[i]+",";
        };
        newString=newString.substring(0,(newString.length-1))
    }
    return newString;
}

Curray.prototype.flat = function(depth, element){
    if(this[0]===undefined) throw TypeError("No se puede convertir a string un objeto null");
/*     if(!(this instanceof Array)) throw TypeError("No se puede convertir a string un objeto bolean");
 */

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

Curray.prototype.filter=function(expression){
    /*     if (this.length === 0) throw TypeError('missing argument 0 when calling function filter');
     */    if(this[0]===undefined) throw TypeError("No se puede convertir a string un objeto null");
    
    
    
            var newarray=[];
            var j=0;
            for(var i=0;i<this.length;i++){
                if(expression(this[i])){
                    newarray[j]=this[i];
                    j++;
                }
            }   return newarray;
};


Curray.prototype.copyWithin=function(target,start,end){
/*     if (arguments.length === 0) throw TypeError('missing argument 0 when calling function copyWithin');
  
    if (end > array.length - 1) throw TypeError('superior range than array length')
  
    if (start < 0) throw TypeError('length less than zero is not possible') */

    var newArray=[];
    var count=0;
    for(var i=start; i<end;i++){
        newArray.push(this[i]);
    }
    for(var i=0; i<newArray.length;i++){
        this[target]=newArray[count];
        count++;
        target++;
    }
}

Curray.prototype.map=function(expression){
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function map');

    var result=[];
    for(var i=0; i<this.length;i++)
        result[i]=expression(this[i],i,this);
    return result;

}

Curray.prototype.join = function(separator) {
    var accumulator = '';
    if (arguments.length === 0) separator = ",";
    if (!(separator instanceof String)) separator = separator.toString();
    for (var i=0; i<this.length; i++) {
            if (this[i] === undefined || this[i] === null) this[i] = '';
            if (i === (this.length -1)) accumulator += this[i];
            else accumulator += this[i] + separator;
        }
    return accumulator;
 };
 
 Curray.prototype.entries=function(iterator){
    if (this.length === 0) throw TypeError('missing argument 0 when calling function entries');

     var i=iterator -1;
     var result=[];
     if(i !== this.length){
         result[0]= i + "," + this[i];
     }
     return result;
 }

 Curray.prototype.every=function(expression){
     var result;
     for(var i=0;i<this.length;i++){
         if(expression(this[i]) != true && result !=true){
             result=false;
         }else{
             result=true;
         }
     }
     return result;
 }

 Curray.prototype.indexOf=function(value){
    if (this.length === 0) throw TypeError('missing argument 0 when calling function indexOf');

     var result;
     for(var i in this){
         if(this[i]===value){
            result=i;
             break;
         }else{
            result=-1;
         }
     }
     return result;
 }

 Curray.prototype.keys=function(){
     var result="";
     for(var i=0; i<this.length;i++){
         result+=i;
     }
     return result;
 }


 Curray.prototype.reverseTest=function(){
    if (this.length === 0) throw TypeError('missing argument 0 when calling function reverse');

     var result=[];
     for(var i=this.length-1;i>=0;i--){
         result.push(this[i]);
     }
/*      this=result;
 */     return result;
 }

 Curray.prototype.sliceTest=function(begin,end){
    if (this.length === 0) throw TypeError('missing argument 0 when calling function slice');

     begin=Math.abs(begin);
     end=Math.abs(end);
     var result=[];
     for(var i=begin;i<end;i++){
         result.push(this[i]);
     }
     return result;
 }

  Curray.prototype.lastIndexOf=function(value){
    if (this.length === 0) throw TypeError('missing argument 0 when calling function lastIndexOf');

     var result="";
     for(var i=0;i<this.length;i++){
         if(this[i]==value){
             result=i;
         }
     }
     return result;
 }

 Curray.prototype.unshift = function(element){
    var inc = arguments.length
    var length = this.length

    for (var i = length - 1; i >= 0; i--){
        this[i + inc] = this[i]
    }
    for (var j = 0; j < arguments.length; j++){
        this[j] = arguments[j]
    }
    
    this.length += inc;
    return this;
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
};


Curray.prototype.findTest=function(expression){
    if (this.length === 0) throw TypeError('missing argument 0 when calling function find');

    for(var i=0;i<this.length;i++){
        if(expression(this[i])){
            return this[i];
        }
    }
}

Curray.prototype.findIndexTest=function(expression){
    if (this.length === 0) throw TypeError('missing argument 0 when calling function find');

    for(var i=0;i<this.length;i++){
        if(expression(this[i])){
            return i;
        }
    }
}

Curray.prototype.includesTest=function(value){
    if(this.lenght===0) throw TypeError('missing argument 0 when calling function includes')
    var count=0
    for(var i=0;i<this.length;i++){
        if(this[i]==value){
            count++;
        }
    }
    if(count==1){
        return true;
    }else{
        return false;
    }
}

Curray.prototype.someTest=function(expression){
    if (this.length === 0) throw TypeError('missing argument 0 when calling function some');
    var count=0
    for(var i=0;i<this.length;i++){
        if(expression(this[i])){
            return true;
        }
    }
    for(var j=0;j<this.length;j++){
        if(!expression(this[j])){
            return false;
        }
    }

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

Curray.prototype.sort = function(expression) {

    for (var i = 0; i < this.length-1; i++) {
        var a = this[i];
        var b = this[i+1];
        if (expression(a,b) > 0 || expression(a,b) === 1) {
            this[i] = b;
            this[i+1] = a;
        } else {
            this[i] = a;
            this[i+1] = b;
        }
    }
  
    for (var i = 0; i < this.length; i++) {
        var a = this[i];
        var b = this[i+1];
        if (expression(a,b) > 0 || expression(a,b) === 1) {
            this.sort(expression)
        }
    }
  
    return this
  }

  Curray.prototype.splice = function(start, remove, add1, add2) {

    var newArray = [];
    var n = 0;
    var x = remove;

    for (var i = 0; i < this.length; i++) {
        if (i < start) {
            newArray[n++] = this[i];
        } else if (x >= 0) {
            if (x === 0) {
                newArray[n++] = this[i];
                if (add1 != 0) {
                    newArray[n++] = add1;
                    add1 = 0;
                    if (add2 != 0) {
                        newArray[n++] = add2;
                        add2 = 0;
                    }
                }
            } else if (x-- === 1) {
                if (add1 != 0) {
                    newArray[n++] = add1;
                    add1 = 0;
                    if (add2 != 0) {
                        newArray[n++] = add2;
                        add2 = 0;
                    }
                }
            }
        } else if (this.length > start + remove) {
            newArray[n++] = array[i];
        }
    }
    return newArray;
};

Curray.prototype.reduceRight = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function reduceRight');
    if (typeof expression !== 'function') throw TypeError(expression + ' is not a function');
    
    var newArray = []
    for (var i = this.length -1; i >= 0  ;i--){
        newArray = expression(newArray, this[i]);
    }
   return newArray;
};

