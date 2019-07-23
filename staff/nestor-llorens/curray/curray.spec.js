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
    describe('join', function () {
        it('it should join all elements into a string', function () {
            var curray = new Curray('s', 'k', 'y');

            var result = curray.join();

            expect(result).toEqual('s,k,y');
        });
    });
    describe('from', function () {
        it(`should return a curray from iterable object and
         can modify every item applying a map function`, function () {

                var curray = new Curray(1, 2, 3);

                var result = curray.from(function (item) { return item * 3 });

                expect(result).toEqual(new Curray(3, 6, 9));


            });
        it(`should throw error if argument is not a function`, function () {

            var curray = new Curray(1, 2, 3);

            var result = curray.from(function (item) { return item * 3 });

            expect(function () {
                curray.from('b');
            })
                .toThrowError(TypeError, 'b is not a function');


        });
    });
    describe('every', function () {
        it(`should return if all elements pass the condition within the function`, function () {

            var curray = new Curray(4, 5, 6);

            var result = curray.every(function (item) { return item > 3 });

            expect(result).toBe(true);


        });
        it(`should throw error if argument is not a function`, function () {

            var curray = new Curray(1, 2, 3);


            expect(function () {
                curray.every(4);
            })
                .toThrowError(TypeError, '4 is not a function');

        });
    });
    describe('filter', function () {
        it(`should return a curray with the elements that pass the condition within the function`, function () {

            var curray = new Curray(4, 5, 6);

            var result = curray.filter(function (item) { return item > 4 });

            expect(result).toEqual(new Curray(5,6));


        });
        it(`should throw error if no arguments`, function () {

            var curray = new Curray(1, 2, 3);


            expect(function () {
                curray.filter();
            })
                .toThrowError(TypeError, 'missing first argument');

        });
    });
    describe('includes', function () {
        it(`should return false if curray dies not have the value (starts at 2nd argument position)`, function () {

            var curray = new Curray(4, 5, 6);

            var result = curray.includes(4,1);

            expect(result).toBe(false);


        });
        it(`should throw error if no arguments`, function () {

            var curray = new Curray(1, 2, 3);


            expect(function () {
                curray.includes();
            })
                .toThrowError(TypeError, 'missing first argument');

        });
    });
    describe('isCurray', function () {
        it(`should return true if .this is a curray)`, function () {

            var curray = new Curray(4, 5, 6);

            var result = curray.isCurray();

            expect(result).toBe(true);


        });
        it(`should throw error if no arguments`, function () {

            var curray = new Curray(1, 2, 3);


            expect(function () {
                curray.includes();
            })
                .toThrowError(TypeError, 'missing first argument');

        });
    });
    describe('map', function () {
        it(`should return a curray with modified elements as per function argument)`, function () {

            var curray = new Curray(4, 5, 6);

            var result = curray.map(function(item){return item -1});

            expect(result).toEqual(new Curray(3,4,5));


        });
        it(`should throw error if no arguments`, function () {

            var curray = new Curray(1, 2, 3);


            expect(function () {
                curray.map();
            })
                .toThrowError(TypeError, 'missing first argument');

        });
    });
    describe('reduce', function () {
        it(`should modify every element by the expression and sum it to an accumulator`, function () {

            var curray = new Curray(4, 5, 6);

            var result = curray.reduce(function(item){return item + 2});

            expect(result).toBe(21);


        });
        it(`should throw error argument is not a function`, function () {

            var curray = new Curray(1, 2, 3);


            expect(function () {
                curray.reduce(3);
            })
                .toThrowError(TypeError, '3 is not a function');

        });
    });
    describe('some', function () {
        it(`should return true if at least 1 element satisfies the condition within the expression`, function () {

            var curray = new Curray(4, 5, 6);

            var result = curray.some(function(item){return item > 5});

            expect(result).toBe(true);


        });
        it(`should throw error argument is not a function`, function () {

            var curray = new Curray(1, 2, 3);


            expect(function () {
                curray.reduce(3);
            })
                .toThrowError(TypeError, '3 is not a function');

        });
    });
    describe('unshift', function () {
        it(`should concatenate arguments at the beginning of the curray and return new length`, function () {

            var curray = new Curray(4, 5, 6);

            var result = curray.unshift(1,2,3);

            expect(result).toBe(6);


        });
        it('curray should have arguments concatenated at the beginning', function () {

            var curray = new Curray(4, 5, 6);
            var result = curray.unshift(1,2,3);


            expect(curray[0]).toBe(1);
            expect(curray[1]).toBe(2);
            expect(curray[2]).toBe(3);
            expect(curray[3]).toBe(4);
            expect(curray[4]).toBe(5);
            expect(curray[5]).toBe(6);
            expect(result).toBe(6);
            


        });
    });

    
});

