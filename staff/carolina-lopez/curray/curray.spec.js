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

    describe('includes', function() {
        it('should search a value in array, true', function() {
            var curray = new Curray(1,2,3,4);

            var result = curray.includes(5);

            expect(result).toBe(false);
        });

        it('should search a value in array, true', function() {
            var curray = new Curray(1,2,3,4);

            var result = curray.includes(5);

            expect(result).toBe(false);
        });
    });

    describe('map', function() {
        it('should creates a new array with the results of calling a provided function on every element in the calling array', function() {
            var curray = new Curray(1,2,3,4);

            var coeficient = 10;

            var result = curray.map(function (value) { return value * coeficient});

            var expected = [10, 20, 30, 40];

            for( var i = 0; i <expected.length; i++){
            expect(result[i]).toBe(expected[i])}; 
       });
    });

    describe('indexof', function() {
        it('should return index of an element', function() {
            var curray = new Curray(1,2,3,4);

            var result = curray.indexof(3);

            expect(result).toBe(2);
        })
    });

    describe('join', function() {
        it('should return a new string by concatenating all of the elements in an array', function() {
            var curray = new Curray('lala', 'lele', 'lili');

            var result = curray.join('-');

            expect(result).toBe('lala-lele-lili');
        })
    });

    describe('concat', function() {
        it('should creates a new array consisting of the elements in the object on which it is called', function () {
            var curray = new Curray('a','b','c');
            var curray2 = new Curray('d','e','f')

            var result = curray.concat(curray2);
            var expected = ['a','b','c','d','e','f'];

            for( var i = 0; i <expected.length; i++){
                expect(result[i]).toBe(expected[i])}; 
            
        })
    });

    describe('every', function () {
        it('should tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value. ', function (){
            var curray = new Curray(1,2,3,4);
            
            var result = curray.every(function(value){
                return value >=10
            });

            expect(result).toBe(false);
        })
    });

    /* describe('flat', function () {
        it('should ', function (){
            var curray = new Curray(1,2,3);
            curray[3] = new Curray('a','b','c');

            var result = curray.flat();
            var expected = (1,2,3,'a','b','c');
            for( var i = 0; i <expected.length; i++){
                expect(result[i]).toBe(expected[i])};
        })
    }); */  

   /*  describe('flat', function(){
        it('should', function(){
            var curray = new Curray(1, 2, 3, new Curray('a', 'b', 'c'));
            
            var result = curray.flat()
            var expected = [1, 2, 3, 'a', 'b', 'c', new Curray('a','b','c')];

            result=Array.from(result);
            expect(result).toEqual(expected);

        })
    }); */

    describe('lastIndexOf', function () {
        it('should returns the last index of an element', function(){
            var curray = new Curray(1,2,3);

            var result = curray.lastIndexOf(2);
            
            expect(result).toBe(1);
        })

        it('should returns the last index of an element', function(){
            var curray = new Curray(1,2,3,2);

            var result = curray.lastIndexOf(2);

            expect(result).toBe(3);
        })

        it('should returns the last index of an element', function(){
            var curray = new Curray(1,2,3,2,4,2);

            var result = curray.lastIndexOf(2);

            expect(result).toBe(5);
        })

        it('should returns -1 because the elements is not present', function(){
            var curray = new Curray(1,2,3,2,4,2);

            var result = curray.lastIndexOf(6);

            expect(result).toBe(-1);
        })

        it('should returns the last index of an element, and indexOf', function(){
            var curray = new Curray(2,5,9,2);

            var result = curray.lastIndexOf(2, 3);

            expect(result).toBe(3);
        })
    });  

    describe('reduce', function(){
        it('should executes a reducer function (that you provide) on each element of the array, resulting in a single output value.' , function(){
            var curray = new Curray(1,2,3);
            var result = curray.reduce(function(acumulator, currentValue, index, curray) {
                return acumulator + currentValue;
            });
            expect(result).toBe(6);
        });
    
    });

    describe('reverse', function(){
        it('should reverses an array', function(){
            var curray = new Curray(1,2,3,4);

            var result = curray.reverse();
            var expected = [4,3,2,1]

            for( var i = 0; i <expected.length; i++){
            expect(result[i]).toEqual(expected[i])};
        })
    })

    describe('shift', function(){
        it('should removes the first element from an array and returns that removed element', function(){
            var curray = new Curray(1,2,3)

            var result = curray.shift();

            expect(result).toBe(1);  
        })
    })

    describe('slice', function(){
        it('shoul returns a shallow copy of a portion of an array into a new array', function(){
            var curray = new Curray('lala','lele','lili','lolo','lulu');

            var result = curray.slice(1,3);
            var expected = ['lele', 'lili'];

            for(var i = 0; i < expected.length; i++){
                expect(result[i]).toBe(expected[i]);
            }
        })
    })

    describe('some', function(){
        it('should tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.', function(){
            var curray = new Curray(1,2,3,4,5);

            var result = curray.some(function(element){
                return element % 2 === 0;
            })

            expect(result).toBe(true);
        })    

        it('should tests whether at least one element in the array passes the test implemented by the provided function. It returns a Boolean value.', function(){
            var curray = new Curray(1,3,5,7);

            var result = curray.some(function(element){
                return element % 2 === 0;
            })

            expect(result).toBe(false);
        })
    }); 
});




