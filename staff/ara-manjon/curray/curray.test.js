'use strict';

describe('Curray', function () {
    describe('push', function () {
        it('should push a string', function () {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0], 'hola mundo');
            expect(result, 1);
        });
    });

    describe('pop', function () {
        it('should pop a string', function () {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result, 'mundo');
            expect(curray.length, 1);
            expect(curray[1], undefined);
        });
    });

    describe('forEach', function () {
        it('should output each element index and curray', function () {
            var curray = new Curray('a', 'b', 'c');

            var outputs = [];

            curray.forEach(function (element, index, curray) {
                outputs.push([element, index, curray]);
            });

            expect(outputs, [
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]
            ]);
        });
    });
    describe('concat', function () {
        it('should output all the arguments into the curray done', function () {

            var curray = new Curray('a', 'b', 'c');
            var curray2 = new Curray(1, 2, 3)


            var result = curray.concat(curray2);

            expect(Array.from(result), ['a', 'b', 'c', 1, 2, 3]);
        })
    });
/*     describe('flat', function () {
        it('should flat the depth indicated in the curray done', function () {
            var curray = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(true, false)));

            var result = curray.flat(2);

            expect(Array.from(result), [1, 2, 3, 'a', 'b', 'c', [true, false]]);
        })
    }); */
/*     describe('flat', function () {
        it('should flat the depth indicated in the curray done', function () {
            var curray = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(true, false, new Curray(undefined, NaN))));

            var result = curray.flat(3);

            expect(Array.from(result), [1, 2, 3, 'a', 'b', 'c', true, false, undefined, NaN]);
        })
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
    }); */
    describe('arrayOf', function () {
        it('should introduce the arguments into a new curray', function () {
            var curray = new Curray(1, 2, 3, 'hello', {}, NaN);

            var result = (curray).arrayOf();
            expect(Array.from(result), [1, 2, 3, 'hello', {}, NaN]);
        })
    });
    describe('arrayOf', function () {
        it('should introduce the arguments into a new curray', function () {
            var curray = new Curray(1, undefined, ({
                a: 'b',
                b: 'c'
            }));

            var result = (curray).arrayOf();
            expect(Array.from(result), [1, undefined, {
                a: 'b',
                b: 'c'
            }]);
        })
    });
    describe('every', function () {
        it('should check all elements of the curray pass the condition of the function done', function () {
            var curray = new Curray(1, 30, 29, 10, 13);

            var result = (curray).every(function (currentValue) {
                return currentValue > 30;
            });
            expect(result, false);
        })
    });
    describe('every', function () {
        it('should indicate that the expression is not a function', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var x = 'fr'

            var result = (curray).every(x);
            expect(result, 'true');
        })
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


    //ARA
    describe('flat', function () {
        it('should flat the depth indicated in the curray done', function () {
            var curray = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(true, false)));

            var result = curray.flat(1);

            expect(Array.from(result)).toEqual([1, 2, 3, 'a', 'b', 'c', [true, false]]);
        });

        it('should flat the depth indicated in the curray done', function () {
            var curray = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(true, false,new Curray(undefined, NaN))));

            var result = curray.flat(2);

            expect(Array.from(result)).toEqual([1, 2, 3, 'a', 'b', 'c', true, false,undefined,NaN]);
        })
    });
