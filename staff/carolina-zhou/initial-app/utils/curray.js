/**
 * DIY Array.
 * 
 * 
 */
function Curray(...args) {
    this.length = 0;

    if (args.length === 1) {
        this.length = args[0];
    } else if (args.length > 1) {
        for (let i = 0; i < args.length; i++) {
            this[i] = args[i];
            // this.push(arguments[i]); // TRY not to depend on push here.
        }
        this.length = args.length;
    }
}

Curray.prototype.push = function (element) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function push');

    this[this.length++] = element;
    return this.length;
};

Curray.prototype.pop = function() {
    if (!(this instanceof Curray)) throw TypeError(`${this}.pop is s not a function`); 

    const last = this[--this.length];

    delete this[this.length];
    return last;
};

Curray.prototype.forEach = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function forEach');
    if (!(expression instanceof Function)) throw TypeError(`${expression} is not a function`);

    for (let i = 0; i < this.length; i++)
        expression(this[i], i, this);
};

Curray.prototype.includes = function(value) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function includes');
    let test = false;

    for(let i = 0; i < this.length; i++){

        if(this[i] == value){
            test = true;
        }
    }
    return test;
};

Curray.prototype.every = function(expression) {
    Curray.prototype.every = function(expression) {
        if (arguments.length === 0) throw TypeError('missing argument 0 when calling function every');
        if (!(expression instanceof Function)) throw new TypeError(`${expression} is not a function`);
    
        for (let i = 0; i < this.length; i++) {
            if(expression(this[i])){
                 return true;
            } else {
                return false;
            }
        }
    }
};

Curray.prototype.copyWithin = function(target, start, end) {
        if (arguments.length === 0) throw TypeError('missing argument 0 when calling function copyWithin');
    
        for (let i = start; i < end; i++) {
            this[target++] = this[i];
        };
        return this;
};
    
Curray.prototype.reverse = function() {
    
        for (let i = 0; i <= Math.floor((this.length - 1) / 2); i++) {
            const a = this[i];
            this[i] = this[this.length - 1 - i];
            this[this.length - 1 - i] = a;
        }
        const realrray = Array.from(this);
        return realrray;
};

Curray.prototype.shift = function() {

    const first = this[0];
    for(let i = 1; i < this.length; i++) {
        this[i-1] = this[i];
    }
    this.length = this.length - 1;
    return first;
};


Curray.prototype.some = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function some');
    if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`);

    for (let i = 0; i < this.length; i++){
        if (expression(this[i]) === true){
            return true;
        }
    }  
    return false;
};

Curray.prototype.map = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function map');
    if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`);

    for (let i = 0; i < this.length; i++) {
        this[i] = expression(this[i], i, this);
    }

    return Array.from(this);
};

Curray.prototype.concat = function(element) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function concat');

    for (let i = 0; i < element.length; i++) {
        this[this.length + i] = element[i]
    };
    this.length = this.length + element.length;
    return this;
};

Curray.prototype.fill = function(value, start, end) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function fill');

    let i=0;
    let j=0;

    if (end){
        for (let j = start; j<end; j++){
          this[j]=value;
        }
        return array;

    } else if (start) {
        for (let i = start; i < this.length-1; i++){
            this[i] = value;
        }
        return Array.from(this);

    } else if (start === undefined) {
        for (let i = 0; i < this.length-1; i++) {
            this[i] = value;
        }
        return Array.from(this);;
    }
};

Curray.prototype.filter = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function filter');
    if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`);

    const newArray= [];
    let j = 0;

    for(let i = 0; i < this.length; i++) {
        if(expression(this[i])){
            newArray[j] = this[i];
            j++;
         }
    }  return newArray;
};

Curray.prototype.find = function(expression) {
    if (arguments.length === 0) throw TypeError ('missing argument 0 when calling function find');

    for (let i = 0; i < this.length; i++){
        if (expression(this[i])) {
            return this[i];
        }
    }
};

Curray.prototype.flat = function(depth = 1) {
    depth = depth < 0? 0 : depth;

    const result = [];

    for (let i = 0; i < this.length; i++) {
        const element = this[i];

        if (element instanceof Curray && depth > 0) {
            const arr = this[i].flat(depth - 1, element);

            for (let j = 0; j < arr.length; j++) result.push(arr[j]);
        } else result.push(element);
    }
    return result;
};

Curray.prototype.indexOf = function(element) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function indexOf');

    for (let i = 0; i < this.length; i++){
        if(this[i] == element){
           return i;
        } 
    }
    return -1;
};

Curray.prototype.join = function(separator) {

    let string = '';

    if (separator == '' || separator == undefined) {
      separator = ',';
    }

    if (this.length == 1) {
      string = this[0];
      return string;
    } else {
      for (let i = 0; i < this.length; i++) {
        if (i == this.length - 1) {
          string += this[i];
        } else {
          string += this[i] + separator;
        }
      }
      return string;
  }
};

Curray.prototype.lastIndexOf = function(element) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function lastIndexOf');

    for (let i = this.length+1; i > 0; i--){     
        if ( this[i] === element ){    
          return i;
        }  
      }
    return -1;
};

Curray.prototype.reduce = function(reducer, initialValue) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function reduce');

    if (initialValue || initialValue === 0) {
        let accumulator = initialValue;
        let start = 0;
    } else {
        let accumulator = this[0];
        let start = 1;
    }

    for (let i = start; i < this.length; i++) {
        accumulator = reducer(accumulator, this[i]);
    }
    return accumulator;
};

Curray.prototype.reduceRight = function(expression) {
    if (arguments.length === 0) throw TypeError('missing argument 0 when calling function reduceRight');
    if (typeof expression !== 'function') throw TypeError(`${expression} is not a function`);

    let newArray = [];
    for (let i = this.length -1; i >= 0  ;i--){
        newArray = expression(newArray, this[i]);
    }
   return newArray;
};

Curray.prototype.slice = function(first, last) {
    if (typeof first !== 'number' && last !== undefined) throw new TypeError(`${first} is not a number`);
    if (typeof last !== 'number' &&  last !== undefined) throw new TypeError(`${last} is not a number`);


    const cut = [];
    const negative = -Math.abs(first); 
    if (first === -Math.abs(first) && last === undefined) {
        const positive = Math.abs(negative);
        for (i = this.length-positive; i < this.length; i++) {
            cut.push(this[i]);
        }
    } else if (first === Math.abs(first) && last === undefined) {
        for (i = first; i < this.length; i++) {
            cut.push(this[i]);
        }
    } else if (first === undefined && last === undefined) {
        for (i = 0; i < this.length; i++) {
            cut.push(this[i]);
        }
    } else {
        for (i = first; i < last; i++) {
            cut.push(this[i]);
        }
    }
    return cut;
};

Curray.prototype.sort = function(expression) {

    if (expression) {
        let done = false;
        while (!done) {
        done = true;
            for (let i = 1; i < this.length; i++) {
                if (this[i - 1] > this[i]) {
                done = false;
                const x = this[i - 1];
                this[i - 1] = this[i];
                this[i] = x;
                }
            }
        }
        return Array.from(this); 
    } else {
        expression = (a, b) => String(a) >= String(b);
        const sorted = [this[0]];

        for (let i = 1; i < this.length; i++) {
            let indexToInsert = 0;

            for (let j = 0; j < sorted.length; j++) {
            if (expression(this[i], sorted[j])) {
              indexToInsert = j + 1;
            } else {
              break
            }
          }
          sorted.splice(indexToInsert, 0, this[i])
        }
        return sorted;
    }
};

Curray.prototype.splice = function(start, remove, add1, add2) {

    const newArray = [];
    let n = 0;
    let x = remove;

    for (let i = 0; i < this.length; i++) {
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

Curray.prototype.toString = function() {

    newString = '';
    for (i = 0; i < this.length; i++){
        newString = `${newString + this[i]},`;
    };
    newString = newString.substring(0, (newString.length-1))

    return newString;
};

Curray.prototype.unshift = function(...args) {

    const newArray = [];
    for (let i = 0; i < args.length; i++){
        newArray[i] = args[i];
    };
    for (let i = 0; i < this.length; i++){
        newArray[i + args.length] = this[i];
    };
    return newArray.length;
};