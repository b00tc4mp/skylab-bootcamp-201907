'use strict';

describe('Curray', function() {

    describe('push', function() {
        it(
            'should push a string', function() {
            var curray = new Curray();
            var result = curray.push('hola mundo');
            expect(curray[0]).toBe('hola mundo');
            expect(result).toBe(1);
        });

        it(
            'should fail on no arguments',
            function() {
                var curray = new Curray();
                expect(function() { curray.push()}).toThrowError(TypeError,'push needs at least one argument (element to be pushed)');
        });
    });


    describe('pop', function() {
        it(
            'should pop a string', 
            function() {
                var curray = new Curray('hola', 'mundo');
                var result = curray.pop();

                expect(result).toBe('mundo');
                expect(curray.length).toBe(1);
                expect(curray[1]).toBeUndefined();
        });

        it(
            'should fail when an argument is passed', 
            function() {
                var curray = new Curray('hola', 'mundo');
                expect(function() { curray.pop('aaaa'); }).toThrowError(TypeError, 'pop accepts no arguments.');
            });
    });

    /* FOREACH: HAPPY PATH */
    describe('forEach', function() {
        it('should output each element index and curray', function () {
            var curray = new Curray('a', 'b', 'c');
    
            var outputs = [];
    
            curray.forEach(function (element, index, curray) {
                outputs.push([element, index, curray]);
            });
    
            expect(outputs).toEqual([
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]]);
        });

        it(
            'should capture no arguments error',
            function () {
                var curray = new Curray('a', 'b', 'c');
                var outputs = [];
                expect(function() {
                    curray.forEach();
                }).toThrowError(TypeError, 'an expression should be passed as argument to forEach')
            })
        });


    /* INDEXOF: HAPPY PATH */
    describe('indexOf', function() {
        it(
            'should get index of an element',
            function() {
                var curray = new Curray('ant', 'bison', 'camel', 'duck', 'bison');
                var result = curray.indexOf('camel');
                expect(result).toBe(2);
            });

        it(
            'should fail on no arguments',
            function() {
                var curray = new Curray('ant', 'bison', 'camel', 'duck', 'bison');
                expect(function() {
                    curray.indexOf();
                }).toThrowError(TypeError, 'at least one argument must be passed in to indexOf');
            });
    });

    describe('reduce', function() {
        it(
            'sum all items in array of numbers',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.reduce(
                    function(accumulator, val) {
                        return accumulator + val
                    }
                );
                expect(result).toBe(10);
            });

        it(
            'capture wrong number o arguments error',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.reduce()
                }).toThrowError(TypeError, 'Wrong number of arguments: two expected (Array, Callback function).')
            });
    });

    describe('reduceRight', function() {
        it(
            'sum all items in curray of numbers backwards',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.reduceRight(
                    function(accumulator, val) {
                        return accumulator + val
                    }
                );
                expect(result).toBe(10);
        });

    });


    describe('every', function() {
        it(
            'should return true all elements in curray are multiple of five',
            function() {
                var curray = new Curray(5,10,15,20,25);
                var result = curray.every(
                    function(val) {
                        return val % 5 === 0;
                    }
                );
                expect(result).toBeTruthy()
            });
        });
    

    describe('reverse', function() {
        it(
            'should return curray reversed',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.reverse()
                expect(Array.from(result)).toEqual([4,3,2,1])
            });
        });



    describe('join', function() {
        it(
            'should join all elements in curray with a comma.',
            function() {
                var curray = new Curray('Fire', 'Air', 'Water');
                var result = curray.join();
                expect(result).toBe('Fire,Air,Water');
            });
        });

    describe('includes', function() {
        it(
            'should check if value passed is in curray',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.includes(4);
                expect(result).toBeTruthy();
            })
    });

    describe('map', function() {
        it(
            'should return a new curray filtered by expression',
            function() {
                var curray = new Curray(1,2,3,4);
                
                var result = curray.map(function(elem) {
                    return elem * 10
                });

                var resultArr = Array.from(result);
                expect(resultArr).toEqual([10,20,30,40])
            })
    });

/*     describe('keys', function() {
        it(
            'should return a new curray with index instead of values',
            function() {
                var curray = new Curray('a','b','c','d');
                var result = curray.keys()
                expect(Array.from(curray)).toEqual([1,2,3,4])
            })
    }); */

});