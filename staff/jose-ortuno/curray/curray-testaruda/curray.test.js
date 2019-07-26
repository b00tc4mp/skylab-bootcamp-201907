'use strict';

describe('Curray TEST', function() {
    describe('push', function() {
        it('should push a string', function() {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0], 'hola mundo');
            expect(result, 1);
        });
    });

    describe('pop', function() {
        it('should pop a string', function() {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result, 'mundo');
            expect(curray.length, 1);
            expect(curray[1], undefined);
        });
    });

    describe('forEach', function() {
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

    describe('concat', function() {
        it('concatenate two or more Currays', function() {
            var curray1 = new Curray('a', 'b', 'c');
            var curray2 = new Curray('d', 'e', 'f');
            var result = curray1.concat(curray2);
            var resultArr = Array.from(result);
            expect(resultArr, ["a", "b", "c", "d", "e", "f"]);
        });
    });

    describe('copyWithin', function() {
        it('copies part of a Curray to another location in the same Curray', function() {
            var curray = new Curray(0, 1, 2, 3, 4, 5, 6, 7);
            var result = curray.copyWithin(0, 2, 4);
            var resultArr = Array.from(result);
            expect(resultArr, [2, 3, 2, 3, 4, 5, 6, 7]);
        })
    });

    describe('find', function() {
        it('returns the value of the first element in the Curray that satisfies the provided', function() {
            var curray = new Curray(1, 2, 3 , 4 , 5);
            var result =curray.find(function(element) {
                return element < 10;
            });
            expect(result, 1);
        });
    });

    describe('every', function() {
        it('returns a Boolean value. Case: true', function() {
            var curray = new Curray(1, 2, 3);
            var result = curray.every(function(value) {
                return value < 4;
            });
            expect(result, true);
        })
        it('returns a Boolean value. Case: false', function() {
            var curray = new Curray(1, 2, 3);
            var result = curray.every(function(value) {
                return value < 2;
            });
            expect(result, false);
        })
    });

    describe('flat', function() {
        it('create a new Curray with all the Curray elements that are inside.', function() {
            var curray = new Curray('a', 'b', 'c');
            curray[3] = new Curray('d', 'f', 'g');
            var result = curray.flat(2);
            var resultArr = Array.from(result);
            expect(resultArr, ['a', 'b', 'c', 'd', 'f', 'g']);
        })
    });

    describe('map', function() {
        it('creates a new array with the results of calling a provided function', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.map(function(currentValue, index, curray) {
                return currentValue * 2;
            });
            var resultArr = Array.from(result);
            expect(resultArr, [2, 4, 6, 8, 10, 12]);
        });
    });

    describe('includes', function() {
        it('check if a certain number exist in the curray. Case: true', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.includes(2);
            expect(result, true);
        });
        it('check if a certain number exist in the curray. Case: false', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.includes(8);
            expect(result, false);
        });
        it('check if a certain number exist in the curray, starting from a index', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.includes(1, 2);
            expect(result, false);
        });
    });

    describe('indexOf', function() {
        it('check certain number into a Curray. In case true, return index.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.indexOf(3);
            expect(result, 2);
        });
        it('check certain number into a Curray. In case false, return -1.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.indexOf(8);
            expect(result, -1);
        });
    });

    describe('indexOf', function() {
        it('check certain number into a Curray. In case true, return index.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.indexOf(3);
            expect(result, 2);
        });
        it('check certain number into a Curray. In case false, return -1.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.indexOf(8);
            expect(result, -1);
        });
    });

    describe('join', function() {
        it('verify a new string concatenated from a Curray. Insert a comma.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.join(', ');
            expect(result, '1, 2, 3, 4, 5, 6');
        });
        it('verify a new string concatenated from a Curray. Cocatenated pure.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.join('');
            expect(result, '123456');
        });
        it('verify a new string concatenated from a Curray. Value undefined.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.join();
            expect(result, '1, 2, 3, 4, 5, 6');
        });
    });

    describe('lastIndexOf', function() {
        it('check certain number into a Curray starting with the last elemnet. In case true, return index.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.lastIndexOf(3);
            expect(result, 2);
        });
        it('check certain number into a Curray starting with the last elemnet. In case false, return -1.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.lastIndexOf(8);
            expect(result, -1);
        });
    });

    describe('reverse', function() {
        it('reverses an array in place.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.reverse();
            var resultArr = Array.from(result);
            expect(resultArr, [6, 5, 4, 3, 2, 1]);
        });
    });

    describe('shift', function() {
        it('removes the first element from a Curray.', function() {
            var curray = new Curray(5, 2, 3, 4, 5, 6);
            var result = curray.shift();
            expect(result, 5);
        });
    });

    describe('slice', function() {
        it('returns a shallow copy of a portion of an array into a new array.', function() {
            var curray = new Curray('Pepito', 'Manolito', 'Luisito', 'Felipito', 'Jorgito', 'Paquito');
            var result = curray.slice(2, 4);
            var resultArr = Array.from(result);
            expect(resultArr, ['Luisito', 'Felipito']);
        });
    });

    describe('some', function() {
        it('check if any elemnt match through an expression', function() {
            var curray = new Curray(5, 2, 3, 4, 5, 6);
            var result = curray.some(function(element, index, curray) {
                return element > 5;
            });
            expect(result, true);
        });
    });

    describe('sort', function() {
        it('sorts the elements of an array in place and returns the sorted array. Case: numbers', function() {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function(a, b) {
                return a - b;
            });
            var resultArr = Array.from(result);
            expect(resultArr, [1, 2, 3, 3, 4, 5]);
        });
        it('sorts the elements of an array in place and returns the sorted array. Case: numbers', function() {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function(a, b) {
                return b - a;
            });
            var resultArr = Array.from(result);
            expect(resultArr, [5, 4, 3, 3, 2, 1]);
        });
    });

    describe('splice', function() {
        it('changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Case: delete', function() {
            var curray = new Curray(5, 3, 6, 2, 1, 4);
            var result = curray.splice(2, 2);
            var currayArr = Array.from(curray)
            expect(result, [6, 2]);
            expect(currayArr, [5, 3, 1, 4]);

        });
        it('changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Case: Remove and adds the elements', function() {
            var curray = new Curray('Pepito', 'Manolito', 'Luisito', 'Felipito', 'Jorgito', 'Paquito');
            var result = curray.splice(2, 1, 'Fulanito');
            var resultArr = Array.from(curray);
            expect(result, ['Fulanito']);
            expect(resultArr, ['Pepito', 'Manolito', 'Fulanito', 'Felipito', 'Jorgito', 'Paquito']);
        });
        it('changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Case: value delete 0', function() {
            var curray = new Curray('Jan', 'March', 'April', 'June');
            var result = curray.splice(1, 0, 'Feb');
            var resultArr = Array.from(curray);
            expect(result, []);
            expect(resultArr, ['Jan', 'Feb', 'March', 'April', 'June']);
        });
    });
});