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


Curray.prototype.shift = function (){

    //keeps the first item of the array passed
    var result = this[this.length-(this.length)]; 
    //deletes the first item of the array and reduces the length of the array
    delete this[--this.length-(this.length)];
    return result;
    

};


Curray.prototype.unshift = function (element){
   
    var array=this;
    var newarray = []
    var j=0;;
    for (var i= 0; i< arguments.length; i++){
        newarray[j]=arguments[i];
        j++;
    }
   
  /*   console.log(Object.keys(newarray).length)
    console.log(newarray)
    console.log(newarray.keys([Object.keys(newarray).length])); */

    for (var i=0; i< array.length; i++){
        newarray[newarray.length]=array[i];

        /* Object.keys(newarray).Object.keys(newarray).length).push(array[i]);
        console.log(newarray[i]) */
    }

    // console.log(newarray)
    array= newarray;

    // console.log(array)
    // console.log(array.length) 
    return array.length;

};


Curray.prototype.indexOf = function (element, start){
    
    start === undefined ? start = 0 : start;
    
     for(var i=start; i< this.length; i++) {
    
        if (this[i]===element){
                return i;
            }
     
    } return -1; 
 
};

Curray.prototype.lastIndexOf = function (element, start){
    
    start === undefined ? start = this.length : start;
    
     for(var i=start; i>=0; i--) {
    
        if (this[i]===element){
                return i;
            }
     
    } return -1; 
 
};


Curray.prototype.slice = function (start, end){

    var newarray = [];

    if (start > this.length){
        return newarray;
    }
    var arg = arguments;
    if (arg.length===0){
        return this;
    }
    start === undefined ? start = 0 : start;
    end === undefined ? end= this.length: end;
  
    var j=0;
    for (var i=start; i<end; i++){
        newarray[j] = this[i];
        j++;
    }
    
    return newarray;

};



Curray.prototype.find = function(expression){

    for (var i=0; i<this.length; i++){
        if(expression(this[i])){
           
            return this[i];

        }

    }
    return undefined;
};



Curray.prototype.findIndex = function(expression){

    for (var i=0; i<this.length; i++){
        if(expression(this[i])){
           
            return i;

        }

    }
    return undefined;
};


Curray.prototype.includes = function (element){

    for (var i=0; i<this.length; i++){
        if (this[i]===element){
            return true;
        }
    }
    return false;

}

Curray.prototype.join = function (separator){

    var array=this;

    separator === undefined ? separator = ',' : separator;

    var newarrayString='';
   
    for (var i= 0; i < array.length; i++){
            i>1 ? newarrayString += array[i] : newarrayString += array[i]+ separator ;
          } 
        return newarrayString;
    };
  


Curray.prototype.some = function(expression){

    for (var i=0; i<this.length; i++){
        if(expression(this[i])){
            return true;
        }
    }
    return false;
};


Curray.prototype.concat = function (element){

    var array = this;
     element === undefined ? newarray = array : element;
    var newarray=[];
    var newarraylength = 0;
    var j=0; 

    for (var i=0; i<array.length; i++){
       
        newarray[newarraylength++]=array[i];
       
    } 

    for (var i=0; i<array.length; i++){
        
        newarray[newarraylength++]=element[j];
        j++;

    } 
     newarray.length=array.length+element.length;
    
    return newarray;
};



Curray.prototype.reverse = function(){
    
    arguments===0 ? arguments===0 : arguments ===0;

    var array = this;
    var newarray =[];
    var newarraylength = 0;
    var j=0;
    
    for (var i=0; i<array.length; i++){
        newarray[newarraylength++]=array[i];
    }

    for (var i=newarray.length-1; i>=0; i--){
        this[j]=newarray[i];
        j++;
    }
    
    return this;

};



  Curray.prototype.sort = function(expression) {
        var result = this;
        for (var i = 0; i < this.length; i++) {
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



Curray.prototype.flat = function() {

    var depth = arguments[1];
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0 ? 0 : depth;

    var result = [];

    for (var i = 0; i < this.length; i++) {
        var element = this[i];

        if (element instanceof Array && depth > 0) {
            var arr = element.flat(depth - 1);

            for (var j = 0; j < arr.length++; j++) result.push(arr[j]);
        } else result.push(element);
    }

    return result;
};

Curray.prototype.map = function(expression) {
    var curray = this;
    var x = this.length;
    var result = new Curray();
    for (var i = 0; i < x; i++) {
        var element = this[i]
        result.push(expression(element, i, curray));
    };
    return result;
};

