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
    for (var i=0; i< array.length; i++){
        newarray[newarray.length]=array[i];
    }

    array= newarray;
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

    if (arguments.length === 0) throw TypeError('undefined is not a function');

    for (var i=0; i<this.length; i++){
        if(expression(this[i])){
           
            return this[i];

        }

    }
    return undefined;
};



Curray.prototype.findIndex = function(expression){

    if (arguments.length === 0) throw TypeError('undefined is not a function');

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

    if (arguments.length === 0) throw TypeError('undefined is not a function');
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

    if (!(expression instanceof Function)) throw TypeError(expression + ' is not defined');

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

    var depth = arguments[0];
    depth = typeof depth === 'undefined' ? 1 : depth;
    depth = depth < 0 ? 0 : depth;
   
    var result = [];

    for (var i = 0; i < this.length; i++) {
        var element = this[i];

        if (element instanceof Array && depth > 0) {
            var arr = element.flat(depth - 1);

            for (var j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }

    return result;
}; 

Curray.prototype.map = function(expression) {
    var array = this;
    var x = this.length;
    var result = new Curray();
    for (var i = 0; i < x; i++) {
        var element = this[i]
        result.push(expression(element, i, array));
    };
    return result;
};


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
           
            for (var i = 0; i < currayRs.length; i++) {
                this[i] = currayRs[i];
            };
            result = [];
            this['length'] = currayRs.length;
            return result;


        } else {
            
            var newLength = (currayCp.length - deleteCount) + values.length;
            for (var i = 0; i < newLength; i++) {
                if (i >= start && i < limit) {
                    delete currayCp[count2++];
                    currayRs.push(values[count++]);
                } else {
                    currayRs.push(currayCp[count2++]);
                };
            };
           
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



Curray.prototype.copyWithin = function(target, start, end) {
   
    for (var i = start; i < end; i++) {
        this[target++] = this[i];
    };
    return this;
};



