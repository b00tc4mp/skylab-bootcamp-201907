'use strict'; 

describe('Curray', function () {
    
    describe('push', function () {
        it('should push a string', function () {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0]).toBe('hola mundo');
            expect(result).toBe(1);
        });
    });

    describe('pop', function () {
        it('should pop a string', function () {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result).toBe('mundo');
            expect(curray.length).toBe(1);
            expect(curray[1]).toBeUndefined();
        });
    });

    describe('forEach', function () {
        it('should output each element index and curray', function () {
            var curray = new Curray('a', 'b', 'c');

            var outputs = [];

            curray.forEach(function (element, index, curray) {
                outputs.push([element, index, curray]);
            });

            expect(outputs).toEqual([
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]
            ]);
        });

        it('should fail on no arguments', function() {
            var curray = new Curray();

            expect(function() {
                curray.forEach();
            }).toThrowError(TypeError, 'missing argument 0 when calling function forEach');
        });
    });

    describe('concat', function() {
        it('should concat 2 elements', function() {
            var curray = new Curray (1 ,2, 3);
            var curray2 = new Curray (4, 5, 6);

            var result = curray.concat(curray2);
            expect(result).toEqual[1, 2, 3, 4, 5, 6];
        });
    });


    describe('flat', function() {
        it('should flatten a curray/one level', function() {
            var curray1 = new Curray(1,2,3,new Curray("a","b","c",new Curray(true, false)));
 
                var result = curray1.flat();
                expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', new Curray(true, false)]);
        });
        it('should flatten a curray/two level', function() {
            var curray1 = new Curray;
            curray1 = ([1, 2, 3, ['a', 'b', 'c', [true, false]]]) ;
            var result = curray1.flat(2);
            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', true, false]);
        });
    });

    describe('copyWithin', function() {
        it('should copy part of the curray whouth changing the lenght', function() {
            var curray1 = new Curray(1, 2, 3);
            debugger;
            var result = Array.from(curray1.copyWithin(1, 2));
            expect(result).toEqual([1,3,3]);
        });

        it('should fail on no arguments', function() {
            var curray1 = new Curray();

            expect(function() {
                curray1.copyWithin();
            }).toThrowError(TypeError, 'missing argument 0 when calling function copyWithin');
        });
    });

    describe('arrayOf',function(){
        it('should introduce the arguments into a new curray', function(){
            var curray = new Curray(1, 2, 3,'hello', {}, NaN);
            
            var result= (curray).arrayOf();
            expect(Array.from(result)).toEqual([1, 2, 3,'hello', {}, NaN]);
        });
    });

    describe('find',function(){
        it('returns the value of the first element in the array that satisfies the provided testing function.', function(){
            var curray = new Curray(1, 30, 39, 29, 10, 13);
           
            var result = (curray).find(30);

            expect(Array.from(result)).toEqual([39]);
        });
    });
    
    describe('filter',function(){
        it('should creates a new curray with all elements that pass the test implemented by the provided function', function(){
            var curray = new Curray('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');

            var result = (curray).filter(curray => curray.length > 6)
                
            expect(Array.from(result)).toEqual(["exuberant", "destruction", "present"]);
        });
    });

    describe('findIndex',function(){
        it('should returns the index of the first element in the array that satisfies the provided testing function/if not -1', function(){
            var curray = new Curray(1, 3, 12, 130, 44);

            var result = (curray).findIndex(13)
                
            expect(result).toEqual(3);
        });
    });

    describe('includes',function(){
        it('should returns true if array includes a certain value/if not false', function(){
            var curray = new Curray(1, 3, 12, 130, 44);

            var result = curray.includes(3)
                
            expect(result).toEqual(true);
        });
    });

    describe('indexOf',function(){
        it('should returns the first index at which a given element /if not -1', function(){
            var curray = new Curray('verde', 'rojo', 'amarillo');

            var result = curray.indexOf("amarillo")
                
            expect(result).toEqual(2);
        });
        it('should returns the first index at which a given element /if not -1', function(){
            var curray = new Curray('verde', 'rojo', 'amarillo');

            var result = curray.indexOf("naranja")
                
            expect(result).toEqual(-1);
        });
    });

    describe('join',function(){
        it('should return new string concat all the elements', function(){
            var curray = new Curray('verde', 'rojo', 'amarillo');

            var result = curray.join();
                
            expect(result).toEqual("verde,rojo,amarillo");
        });
        it('should return new string concat all the elements', function(){
            var curray = new Curray('verde', 'rojo', 'amarillo');

            var result = curray.join("-");
                
            expect(result).toEqual("verde-rojo-amarillo");
        });
        it('should return new string concat all the elements', function(){
            var curray = new Curray('verde', 'rojo', 'amarillo');

            var result = (curray).join(",");
                
            expect(result).toEqual("verde,rojo,amarillo");
        });
    });

    describe('lastIndexOf',function(){
        it('should return the last index from the element given/if not -1', function(){
            var curray = new Curray(1, 3, 12, 130, 3);

            var result = curray.lastIndexOf(3)
                
            expect(result).toEqual(4);
        });
    });

    describe('reduce',function(){
        it('should reduce function (that you provide) on each element ', function(){
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.reduce("+");
                
            expect(result).toEqual(10);
        });
    });

    describe('reverse',function(){
        it('should reverse the item in the curray', function(){
            var curray = new Curray("hola", "mundo", "adios");

            var result = curray.reverse();
                
            expect(result).toEqual("adios,mundo,hola");
        });
    }); 

    describe('shift',function(){
        it('should remove the first item return the element', function(){
            var curray = new Curray("hola", "mundo", "adios");
    
            var result = curray.shift();
                
            expect(result).toEqual("hola");
        });
    });


    /* describe('fill', function () {
        it('should fill all the items with the input introduced to and from the desired start index', function () {
            var curray = new Curray(1, 2, 3, 4, 5);

            var result = curray.fill(5, 1);


            result = Array.from(result);
            expect(result).toEqual([1, 5, 5, 5, 5]);

        });

        it('fill all the items with the input passed to a fill from the start index you passed', function () {

            var curray = new Curray(1, 2, 3, 4, 5);

            var result = curray.fill(5);
            var expected = [5, 5, 5, 5, 5];
            var arrResult = Array.from(result)
            expect(arrResult).toEqual(expected);
        });

    }); */

    describe('every',function(){
        it('should check all elements of the curray pass the condition of the function done', function(){
            var curray = new Curray(1, 30, 29, 10, 13);

            var result = (curray).every(function (currentValue) {
                return currentValue > 30;
            });
            expect(result).toBe(false);
        });
    });

    describe('filter',function(){
        it('returns the value of the first element in the array that satisfies the provided testing function', function(){
            var curray = new Curray(1, 30, 29, 10, 13);

            var result = (curray).every(function (currentValue) {
                return currentValue > 30;
            });
            expect(result).toBe(false);
        });
    });

    describe('map', function () {
         it('multiply by 10 all items', function () {
             var curray1 = new Curray (1, 2, 3);
    

             var result = curray1.map(function (value) { return value * 10; });
            result=Array.from(result)
            expect(result).toEqual([10, 20, 30]);
         });
    
          it('wrap each element between <>', function () {
              var curray1 = new Curray ('1', '2', '3');

              var result = [];
    
              result = curray1.map(function (value) { return '<' + value + '>'; });
              result=Array.from(result)
              expect(result).toEqual(["<1>", "<2>", "<3>"]);
          });
          
          it('should fail on no arguments', function() {
            var curray1 = new Curray();

            expect(function() {
                curray1.map();
            }).toThrowError(TypeError, 'missing argument 0 when calling function map');
        });
      
     }); 

    describe('slice',function(){
        it('should return new curray with the selected fragment ', function(){
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.slice(1,2);
                
            expect(result).toEqual("2");
        });

        it('should fail on no arguments', function() {
            var curray = new Curray();

            expect(function() {
                curray.slice();
            }).toThrowError(TypeError, 'missing argument 0 when calling function slice');
        });   
    });
    
});
