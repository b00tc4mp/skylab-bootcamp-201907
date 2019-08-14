
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

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.forEach();
            }).toThrowError(TypeError, 'missing argument 0 when calling function forEach');
        });
    });

    describe('concat', function () {
        it('should output all the arguments into the curray done', function () {

            var curray = new Curray('a', 'b', 'c');
            var curray2 = new Curray(1, 2, 3);


            var result = curray.concat(curray2);

            expect(Array.from(result)).toEqual(['a', 'b', 'c', 1, 2, 3]);
        });
    });



    describe('arrayOf', function () {
        it('should introduce the arguments into a new curray', function () {
            var curray = new Curray(1, 2, 3, 'hello', {}, NaN);

            var result = (curray).arrayOf();
            expect(Array.from(result)).toEqual([1, 2, 3, 'hello', {}, NaN]);
        });

        it('should introduce the arguments into a new curray', function () {
            var curray = new Curray(1, undefined, ({
                a: 'b',
                b: 'c'
            }));

            var result = (curray).arrayOf();
            expect(Array.from(result)).toEqual([1, undefined, {
                a: 'b',
                b: 'c'
            }]);
        });
    });



    describe('every', function () {
        it('should check all elements of the curray pass the condition of the function provided', function () {
            var curray = new Curray(1, 30, 29, 10, 13);

            var result = (curray).every(function (currentValue) {
                return currentValue > 30;
            });
            expect(result).toBe(false);
        });

        it('should indicate that the arguments cannot be 0', function () {
            var curray = new Curray();


            expect(function () {
                curray.every()
            }).toThrowError(TypeError, 'missing argument 0 when calling function copyWithin');
        });

        it('should indicate that the expression is not a function', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6);

            expect(function () {
                curray.every(1);
            }).toThrowError(TypeError, 'is not a function');
        });
    });

    describe('flat', function () {
        it('should flatten a curray/one level', function () {
            var curray1 = new Curray(1, 2, 3, new Curray("a", "b", "c", new Curray(true, false)));

            var result = curray1.flat();
            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', new Curray(true, false)]);
        });

        it('should flatten a curray/two level', function () {
            var curray1 = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(true, false)));
            var result = curray1.flat(2);
            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', true, false]);
        });

        it('should flatten a curray/three level', function () {
            var curray1 = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(true, false, new Curray(1, 2, 3))));
            var result = curray1.flat(3);
            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', true, false, 1, 2, 3]);
        });

    });

    describe('find', function () {
        it('should return the fist value that satisfies the provided testing function', function () {
            var curray = new Curray('elephant', 'bird', 'dog', 'gorilla');

            var result = (curray).find(function (currentValue) {
                return currentValue.length < 4;
            });
            expect(result).toEqual('dog');
        });

        it('should return the fist value that satisfies the provided testing function', function () {
            var curray = new Curray({
                name: 'guitars',
                quantity: 2
            }, {
                name: 'piano',
                quantity: 0
            }, {
                name: 'bass',
                quantity: 5
            });

            var result = (curray).find(function (currentValue) {
                return currentValue.name === 'bass';
            });
            expect(result).toEqual({
                name: 'bass',
                quantity: 5
            });

        });

        it('should return undefined if not is find any value', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6, 7, 8, 9);

            var result = (curray).find(function (currentValue) {
                return currentValue === 10;
            });
            expect(result).toEqual(undefined);

        });
    });

    describe('map', function () {
        it('should returns a new array with all the values after be applied the function provided', function () {
            var curray = new Curray(1, 2, 3, 10, 20, 30);

            var result = (curray).map(function (currentValue) {
                return currentValue * 10;
            });
            expect(Array.from(result)).toEqual([10, 20, 30, 100, 200, 300]);
        });

        it('should returns missing arguments', function () {
            var curray = new Curray();

            var result = (curray).map(function (currentValue) {
                return currentValue * 9;
            });

            expect(function () {
                curray.every()
            }).toThrowError(TypeError, 'missing argument 0 when calling function copyWithin');
        });
    });

    describe('fill', function () {
        it('should return the modified curray with value from start index to the end index', function () {

            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.fill(0, 3, 6);
            var currExpect = new Curray(1, 2, 3, 0, 0, 0);

            expect(curray).toEqual(currExpect);

        });
        it('should return the modified curray with value from start index to the end index', function () {

            var curray = new Curray('a', 'b', 'c', 'd');
            var result = curray.fill(NaN, 2);
            var currExpect = new Curray('a', 'b', NaN, NaN);

            expect(curray).toEqual(currExpect);

        });


    });

    describe('filter', function () {
        it('should return a new curray with elements that pass the condition', function () {

            var curray = new Curray('spray', 'limit', 'elite', 'exuberant', 'destruction', 'present');

            var result = (curray).filter(function (currentValue) {
                return currentValue.length > 6;
            });

            expect(Array.from(result)).toEqual(['exuberant', 'destruction', 'present']);

        });

    });

    describe('findIndex', function () {
        it('should return the index of the first value passed the test', function () {
            var curray = new Curray(1, 30, 15, 22);

            var result = (curray).findIndex(function (currentValue) {
                return currentValue > 10;
            });

            expect(result).toEqual(1);
        });
        it('should return -1 if any value pass the test', function () {
            var curray = new Curray(30, 15, 22);

            var result = (curray).findIndex(function (currentValue) {
                return currentValue < 10;
            });

            expect(result).toEqual(-1);
        });
    });

    describe('indexOf', function () {
        it('should return the first index find of the element provided in the curray', function () {

            var curray = new Curray('green', 'blue', 'red', 'yellow', 'black', 'red');

            var result = curray.indexOf('red', 3);

            expect(result).toEqual(5);
        });
        it('should return -1 if any value pass the test', function () {
            var curray = new Curray(1, 2, 3, 4, 5);

            var result = curray.indexOf(10);

            expect(result).toEqual(-1);
        });
    });

    describe('includes', function () {
        it('should return a boolean value if the curray has or not the element given', function () {

            var curray = new Curray('green', 'blue', 'red', 'yellow', 'black', 'red');

            var result = curray.includes('black');

            expect(result).toEqual(true);
        });
        it('should return false if the element it is not in the curray', function () {
            var curray = new Curray(1, 2, 3, 4, 5);

            var result = curray.includes(10);

            expect(result).toEqual(false);
        });
    });

    describe('reverse', function () {
        it('should return the curray modified. The last input becomes the first', function () {
            var curray = new Curray('one', 'two', 'three');

            var result = curray.reverse();

            expect(Array.from(result)).toEqual(['three', 'two', 'one']);
            debugger
        });

        it('should return the curray modified', function () {
            var curray = new Curray(1, 2, 3, 4, 5);

            var result = curray.reverse();

            expect(result).toEqual([5, 4, 3, 2, 1]);


        });
    })

    describe('shift', function () {
        it('should return the element removed', function () {
            var curray = new Curray('one', 'two', 'three');

            var result = curray.shift();

            expect(curray.shift()).toEqual('one');

        });

        it('should return the element removed', function () {
            var curray = new Curray(1, 2, 3, 4, 5);

            var result = curray.shift();

            expect(curray.shift()).toEqual(1);

        });
    });

    describe('some', function () {
        it('should return a boolean. True if some element of the array pass the test, if not, false', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6, 7, 8, 9);

            var result = (curray).some(function (currentValue) {
                return currentValue == 10;
            });

            expect(result).toEqual(false);

        });

        it('should return a boolean. True if some element of the array pass the test, if not, false', function () {
            var curray = new Curray('dog', 'cat', 'elephant');

            var result = (curray).some(function (currentValue) {
                return currentValue[0] == 'c';
            });

            expect(result).toEqual(true);


        });
    });

    describe('copyWhithin', function () {
        it('should copy part of a curray in the same curray whithou modified the length', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6, 7, 8, 9);

            var result = (curray).copyWithin(0, 7, 8);

            expect(Array.from(result)).toEqual([8, 2, 3, 4, 5, 6, 7, 8, 9]);

        });

        it('should indicate taht the arguments cannot be 0', function () {
            var curray = new Curray();

            expect(function () {
                curray.copyWithin();
            }).toThrowError(TypeError, 'missing argument 0 when calling function copyWithin');


        });
    });

    describe('join', function () {
        it('should return a new string concatening all the elements separated by comas', function () {
            var curray = new Curray('a', 'b', 'c', 'd');

            var result = curray.join();

            expect(result).toEqual("a,b,c,d");

        });

        it('should return a new string concatening all elements separated by +', function () {
            var curray = new Curray('a', 'b', 'c', 'd');
            var result = curray.join('+');

            expect(result).toEqual("a+b+c+d");

        });
    });

    describe('reduce', function () {
        it('should return a single value. Result of the reducer function', function () {
            var curray = new Curray(100, 100, 300);

            var result = curray.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue
            });

            expect(result).toEqual(500);

        });

        it('should return a single value. Result of the reducer function', function () {
            var curray = new Curray('a','b','c','d','f');

            var result = curray.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue
            });

            expect(result).toEqual('abcdf');

        });

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.reduce();
            }).toThrowError(TypeError, 'missing argument 0 when calling function reduce');
        });
    });

    describe('reduceRight', function () {
        it('should return a single value, result of apply the reducer function from right to left', function () {
            var curray = new Curray('z','y','x','w');

            var result = curray.reduceRight(function (acc, curr) {return acc + curr;})

            expect(result).toEqual('wxyz');

        });

        it('should indicate that the expression its not a function', function () {
            var curray = new Curray();

            expect(function () {
                curray.reduceRight('func');
            }).toThrowError(TypeError, 'func is not a function');
        }); 

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.reduceRight();
            }).toThrowError(TypeError, 'missing argument 0 when calling function reduceRight');
        }); 

    });

    describe('slice', function() {
        it('should copy a portion of a curray into the curray ', function() {
            var curray = new Curray (1, 2, 3, 4, 5, 6);
            var result = curray.slice(2, 1, 'n', 'n');

            expect(result).toEqual([1, 2, "n", "n", 4, 5, 6]);
        });

         it('should return an empty curray', function() {
            var curray = new Curray (1, 2, 3, 4, 5, 6);
            var result = curray.slice();

            expect(result).toEqual([]);
        }); 
    })

    describe('sort', function() {
        it('should return the sorted curray', function() {
            var curray = new Curray (1, 30, 4, 21, 100000);
            var result = curray.sort();
    
            expect(result).toEqual([1, 100000, 21, 30, 4]);
        });

        it('should return the sorted curray', function() {
            var curray = new Curray (1, 30, 4, 21, 100000);


            var result = curray.sort();

            expect(result).toEqual([1, 100000, 21, 30, 4]);
        });
    });

    describe('toString', function() {
        it('should return curray as a string', function() {
            
            var curray = new Curray (1,2,3,4,5,6);
            var result = curray.toString();

            expect(result).toEqual("1,2,3,4,5,6");
        });
    });

    describe('unshift', function() {
        it('should add elements to the start of curray and return new length, case 1', function() {
            var array = [1,2,3,4,5,6];
            var result = array.unshift(-1, 2);

            expect(result).toEqual(8);
        });

        it('should add elements to the start of curray and return new length, case 2', function() {
            var array = [1,2,3,4,5,6];
            var result = array.unshift();

            expect(result).toEqual(6);
        });
    });

    describe('lastIndexOf', function() {
        it('should find last index of introduced element', function() {
            var curray = new Curray ('a', 'k', 'a', 'k', 'a', 'k', 'k');
            var result = curray.lastIndexOf('a');

            expect(result).toEqual(4);
        });

        it('should fail on no arguments', function() {
            var curray = new Curray();

            expect(function() {
                curray.lastIndexOf();
            }).toThrowError(TypeError, 'missing argument 0 when calling function lastIndexOf');
        });
    })


});