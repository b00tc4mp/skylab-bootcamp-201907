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
            });
    });

    describe('map', function() {
        it(
            'should return a new curray filtered by expression',
            function() {
                var curray = new Curray(1,2,3,4);
                
                var result = curray.map(function(elem) {
                    return elem * 10;
                });

                var resultArr = Array.from(result);
                expect(resultArr).toEqual([10,20,30,40]);
            });
    });

    describe('keys', function() {
        it(
            'should return new curray with indices as values',
            function() {
                var curray = new Curray('a','b','c','d');
                var result =  curray.keys();
                expect(Array.from(result)).toEqual([0,1,2,3]);
        });
    });

    describe('fill', function() {
        it(
            'should return modified curray with elements replaced by fill rules',
            function() {
                var curray = new Curray('a','b','c','d','e','f');
                var result =  curray.fill(0, 2, 4);
                expect(Array.from(result)).toEqual(['a','b',0,0,'e','f']);
        });
    });

    describe('entries', function() {
        it(
            'should return a curray iterator made of [index, value]',
            function() {
                var curray = new Curray('a','b','c','d');
                var result = curray.entries();
                expect(result).toEqual([[0,'a'], [1,'b'], [2,'c'], [3,'d']][Symbol.iterator]());
            });
        });
    
    describe('from', function() {
        it(
            'should return a new curray iterator from an Array-like iterable',
            function() {
                var curray = new Curray();
                var result = curray.from(['a', 'b', 'c', 'd']);
                var expected = new Curray('a', 'b', 'c', 'd');
                expect(result).toEqual(expected)
            });
        });
    
    describe('find', function() {
        it(
            'should return first element in curray that meets expression condition',
            function() {
                var curray = new Curray(5, 12, 8, 130, 44);
                var result = curray.find(function(elem) {
                    return elem > 10;
                });
                expect(result).toBe(12);
            });
        });
    
    describe('findIndex', function() {
        it(
            'should return the index of the first element in curray that meets expression condition',
            function() {

                var curray = new Curray(5, 12, 8, 130, 44);
                var result = curray.findIndex(function(elem) {
                    return elem > 10;
                });
                expect(result).toBe(1)
            });
        });
    
    describe('concat', function() {
        it(
            'should return a curray listing all elements from two different currays',
            function() {
                var curray1 = new Curray('a','b','c');
                var curray2 = new Curray('d','e','f');
                var result = curray1.concat(curray2);
                expect(result).toEqual(new Curray('a','b','c','d', 'e', 'f'))
            });
        });
    
    describe('copyWithin', function() {
        it(
            'should return the same curray with one or more element shallow-copied to another location within the same curray',
            function() {
                var curray = new Curray('a', 'b', 'c', 1, 'd', 2, 'e');
                curray.copyWithin(0, 4, 7)
                expect(curray).toBe(new Curray(1, 'd', 2, 1, 'd', 2, 'e'))

            }
        
        )
    })

});

