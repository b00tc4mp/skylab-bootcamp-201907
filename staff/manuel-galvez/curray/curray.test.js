'use strict';

describe('Curray', function() {

    /* PUSH: HAPPY PATH */
    describe('push', function() {
        it('should push a string', function() {
            var curray = new Curray();
            var result = curray.push('hola mundo');
            expect(curray[0], 'hola mundo');
            expect(result, 1);
        });
    });

    /* PUSH: EXCEPTION PATH */
    describe('push', function() {
        it(
            'should capture error for push with no arguments', 
            function() {
                var curray = new Curray();
                var result = curray.push();
        }, function(error) {
            expect(error instanceof TypeError, true);
            expect(error.message,'push needs at least one argument (element to be pushed)');
        }
    )});


    /* POP: HAPPY PATH */
    describe('pop', function() { it('should pop a string', function() {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result, 'mundo');
            expect(curray.length, 1);
            expect(curray[1], undefined);
        });
    });

    /* POP: EXCEPTION PATH */
    describe('pop', function() { 
        it(
            'should capture no arguments error', function() {
                var curray = new Curray('hola', 'mundo');
                var result = curray.pop('aaaa');
            },
            function(error) {
                expect(error instanceof TypeError, true);
                expect(error.message, "pop accepts no arguments.");
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
    
            expectArrays(outputs, [
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]
            ]);
        });
    });

    /* FOREACH: EXCEPTION PATH */
    describe('forEach', function() {
        it(
            'should capture no arguments error',
            function () {
                var curray = new Curray('a', 'b', 'c');
                var outputs = [];
                curray.forEach();
            },
            function(error) {
                expect(error instanceof TypeError, true);
                expect(error.message,'an expression should be passed as argument to forEach');
            });
        });


    /* INDEXOF: HAPPY PATH */
    describe('indexOf', function() {
        it(
            'should get index of an element',
            function() {
                var curray = new Curray('ant', 'bison', 'camel', 'duck', 'bison');
                var result = curray.indexOf('camel');
                expect(result, 2);
            });
        });

    /* INDEXOF: EXCEPTION PATH */
    describe('indexOf', function() {
        it(
            'should capture no arguments error',
            function() {
                var curray = new Curray('ant', 'bison', 'camel', 'duck', 'bison');
                var result = curray.indexOf();
            },
            function(error) {
                expect(error instanceof TypeError, true);
                expect(error.message,'at least one argument must be passed in to indexOf');
            });
        });

    /* REDUCE: HAPPY PATH */
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
                expect(result, 10);
            }
        );
    });

    /* REDUCE: EXCEPTION PATH*/
    describe('reduce', function() {
        it(
            'capture wrong number o arguments error',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.reduce()
                },
                function(error) {
                    expect(error instanceof TypeError, true);
                    expect(error.message,'Wrong number of arguments: two expected (Array, Callback function).');
                }
        );
    });


    //it (description, expression, handleError)
    describe('join', function() {
        it(
            'should join all elements in curray with a comma.',
            function() {
                var curray = new Curray('Fire', 'Air', 'Water');
                var result = curray.join();
                expect(result, 'Fire,Air,Water');
            });
        });

    describe('includes', function() {
        it(
            'should check if value passed is in curray',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.includes(4);
                expect(result, true);
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

                var resultArr = Array.from(result)
                expectArrays(resultArr, [10,20,30,40])
            })
    })

});