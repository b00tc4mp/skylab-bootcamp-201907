'use strict';

describe('Curray TEST', function() {
    describe('push', function() {
        it('should push a string', function() {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0]).toEqual('hola mundo');
            expect(result).toBe(1);
        });
    });

    describe('pop', function() {
        it('should pop a string', function() {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result).toEqual('mundo');
            expect(curray.length).toBe(1);
            expect(curray[1]).toBeUndefined();
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
        it('should concatenate two or more Currays', function() {
            var curray1 = new Curray('a', 'b', 'c');
            var curray2 = new Curray('d', 'e', 'f');
            var result = curray1.concat(curray2);
            var resultArr = Array.from(result);
            expect(resultArr).toEqual(["a", "b", "c", "d", "e", "f"]);
        });
    });

    describe('copyWithin', function() {
        it('should copies part of a Curray to another location in the same Curray', function() {
            var curray = new Curray(0, 1, 2, 3, 4, 5, 6, 7);
            var result = curray.copyWithin(0, 2, 4);
            var resultArr = Array.from(result);
            expect(resultArr).toEqual([2, 3, 2, 3, 4, 5, 6, 7]);
        })
    });

    describe('find', function() {
        it('should returns the value of the first element in the Curray that satisfies the provided', function() {
            var curray = new Curray(1, 2, 3 , 4 , 5);
            var result =curray.find(function(element) {
                return element < 10;
            });
            expect(result).toBe(1);
        });
    });

    describe('every', function() {
        it('should returns a Boolean value. Case: true', function() {
            var curray = new Curray(1, 2, 3);
            var result = curray.every(function(value) {
                return value < 4;
            });
            expect(result).toBe(true);
        })
        it('should returns a Boolean value. Case: false', function() {
            var curray = new Curray(1, 2, 3);
            var result = curray.every(function(value) {
                return value < 2;
            });
            expect(result).toBe(false);
        })
    });

    describe('map', function() {
        it('should creates a new array with the results of calling a provided function', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.map(function(currentValue, index, curray) {
                return currentValue * 2;
            });
            var resultArr = Array.from(result);
            expect(resultArr).toEqual([2, 4, 6, 8, 10, 12]);
        });
    });

    describe('includes', function() {
        it('should check if a certain number exist in the curray. Case: true', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.includes(2);
            expect(result).toBe(true);
        });
        it('should check if a certain number exist in the curray. Case: false', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.includes(8);
            expect(result).toBe(false);
        });
        it('should check if a certain number exist in the curray, starting from a index', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.includes(1, 2);
            expect(result).toBe(false);
        });
    });

    describe('indexOf', function() {
        it('should check certain number into a Curray. In case true, return index.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.indexOf(3);
            expect(result).toBe(2);
        });
        it('should check certain number into a Curray. In case false, return -1.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.indexOf(8);
            expect(result).toBe(-1);
        });
    });

    describe('indexOf', function() {
        it('should check certain number into a Curray. In case true, return index.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.indexOf(3);
            expect(result).toBe(2);
        });
        it('should check certain number into a Curray. In case false, return -1.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.indexOf(8);
            expect(result).toBe(-1);
        });
    });

    describe('join', function() {
        it('should verify a new string concatenated from a Curray. Insert a comma.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.join(', ');
            expect(result).toEqual('1, 2, 3, 4, 5, 6');
        });
        it('should verify a new string concatenated from a Curray. Cocatenated pure.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.join('');
            expect(result).toEqual('123456');
        });
        it('should verify a new string concatenated from a Curray. Value undefined.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.join();
            expect(result).toEqual('1, 2, 3, 4, 5, 6');
        });
    });

    describe('lastIndexOf', function() {
        it('should check certain number into a Curray starting with the last elemnet. In case true, return index.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.lastIndexOf(3);
            expect(result).toBe(2);
        });
        it('should check certain number into a Curray starting with the last elemnet. In case false, return -1.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.lastIndexOf(8);
            expect(result).toBe(-1);
        });
    });

    describe('reverse', function() {
        it('should reverses an array in place.', function() {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.reverse();
            var resultArr = Array.from(result);
            expect(resultArr).toEqual([6, 5, 4, 3, 2, 1]);
        });
    });

    describe('shift', function() {
        it('should removes the first element from a Curray.', function() {
            var curray = new Curray(5, 2, 3, 4, 5, 6);
            var result = curray.shift();
            expect(result).toBe(5);
        });
    });

    describe('slice', function() {
        it('should returns a shallow copy of a portion of an array into a new array.', function() {
            var curray = new Curray('Pepito', 'Manolito', 'Luisito', 'Felipito', 'Jorgito', 'Paquito');
            var result = curray.slice(2, 4);
            var resultArr = Array.from(result);
            expect(resultArr).toEqual(['Luisito', 'Felipito']);
        });
    });

    describe('some', function() {
        it('should check if any elemnt match through an expression', function() {
            var curray = new Curray(5, 2, 3, 4, 5, 6);
            var result = curray.some(function(element, index, curray) {
                return element > 5;
            });
            expect(result).toBe(true);
        });
    });

    describe('sort', function() {
        it('should sorts the elements of an array in place and returns the sorted array. Case: numbers', function() {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function(a, b) {
                return a - b;
            });
            var resultArr = Array.from(result);
            expect(resultArr).toEqual([1, 2, 3, 3, 4, 5]);
        });
        it('should sorts the elements of an array in place and returns the sorted array. Case: numbers', function() {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function(a, b) {
                return b - a;
            });
            var resultArr = Array.from(result);
            expect(resultArr).toEqual([5, 4, 3, 3, 2, 1]);
        });
        it('should sorts the elements of an array in place and returns the sorted array. Case: words', function() {
            var curray = new Curray('d', 'a', 'c', 'b', 'e');
            var result = curray.sort(function(a, b) {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
                // a equal to b
                return 0;
            });
            var resultArr = Array.from(result);
            expect(resultArr).toEqual(["a", "b", "c", "d", "e"]);
        });
    });

    describe('splice', function() {
        it('should changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Case: delete', function() {
            var curray = new Curray(5, 3, 6, 2, 1, 4);
            var result = curray.splice(2, 2);
            var currayArr = Array.from(curray)
            expect(result).toEqual([6, 2]);
            expect(currayArr).toEqual([5, 3, 1, 4]);

        });
        it('should changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Case: Remove and adds the elements', function() {
            var curray = new Curray('Pepito', 'Manolito', 'Luisito', 'Felipito', 'Jorgito', 'Paquito');
            var result = curray.splice(2, 1, 'Fulanito');
            var resultArr = Array.from(curray);
            expect(result).toEqual(['Fulanito']);
            expect(resultArr).toEqual(['Pepito', 'Manolito', 'Fulanito', 'Felipito', 'Jorgito', 'Paquito']);
        });
        it('should changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. Case: value delete 0', function() {
            var curray = new Curray('Jan', 'March', 'April', 'June');
            var result = curray.splice(1, 0, 'Feb');
            var resultArr = Array.from(curray);
            expect(result).toEqual([]);
            expect(resultArr).toEqual(['Jan', 'Feb', 'March', 'April', 'June']);
        });
    });
    
    describe('unshift', function() {
        it('should add one or more elements to the beginning of an array and return a new length of the array.', function() {
            var curray = new Curray(1, 2, 3);
            var result = curray.unshift(4, 5);
            var currayArr = Array.from(curray)
            expect(result).toBe(5);
            expect(currayArr).toEqual([4, 5, 1, 2, 3]);
        });
    });
});

describe('flat', function(){
    it('should creates a new array with all sub-array elements concatenated into it recursively. CASE: no arguments' , function(){
        var curray = new Curray(1,2,3,[4,5]);
        var result = curray.flat();
        var result = Array.from(result);

        expect(result).toEqual([1,2,3,4,5]);
    });

    it('should creates a new array with all sub-array elements concatenated into it recursively. CASE: two depth', function(){
        var curray = new Curray(1,2,[1,2,[1,2]]);
        var result = curray.flat(2);
        var result = Array.from(result);
        expect(result).toEqual([1,2,1,2,1,2]);
    });

    it('should creates a new array with all sub-array elements concatenated into it recursively. CASE: one depth', function(){
        var curray = new Curray([1,2],[1,2],[1,2]);
        var result = curray.flat(1);
        var result = Array.from(result);
        expect(result).toEqual([1,2,1,2,1,2]);
    });
});

describe('flatMap', function(){
    it('should creates a new array with all sub-array elements concatenated into it recursively. CASE: one depth', function(){
        var curray = new Curray([1,2],[1,2],[1,2]);
        var result = curray.flat(1);
        var result = Array.from(result);
        expect(result).toEqual([1,2,1,2,1,2]);
    });
});



describe('reduce', function(){
    it('should first maps each element using a mapping function, then flattens the result into a new array. It is identical to a map() followed by a flat() of depth 1, but flatMap() is often quite useful, as merging both into one method is slightly more efficient. CASE: sum' , function(){
        var curray = new Curray(1,2,3);
        var result = curray.reduce(function(acumulator, currentValue, index, curray) {
            return acumulator + currentValue;
        });
        expect(result).toBe(6);
    });
    it('should executes a reducer function (that you provide) on each element of the array, resulting in a single output value. CASE: rest' , function(){
        var curray = new Curray(6,2,1);
        var result = curray.reduce(function(acumulator, currentValue, index, curray) {
            return acumulator - currentValue;
        });
        expect(result).toBe(3);
    });
    it('should executes a reducer function (that you provide) on each element of the array, resulting in a single output value. CASE: mult' , function(){
        var curray = new Curray(1,2,3);
        var result = curray.reduce(function(acumulator, currentValue, index, curray) {
            return acumulator * currentValue;
        });
        expect(result).toBe(6);
    });
    it('should executes a reducer function (that you provide) on each element of the array, resulting in a single output value. CASE: div' , function(){
        var curray = new Curray(12,2,2);
        var result = curray.reduce(function(acumulator, currentValue, index, curray) {
            return acumulator / currentValue;
        });
        expect(result).toBe(3);
    });

});

describe('reduceRight', function() {
    it('applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value. CASE: sum', function() {
        var curray = new Curray(1,2,3);
        var result = curray.reduceRight(function(acumulator, currentValue, index, curray) {
            return acumulator + currentValue;
        })
        expect(result).toBe(6);
    })
    it('applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value. CASE: rest', function() {
        var curray = new Curray(1,2,6);
        var result = curray.reduceRight(function(acumulator, currentValue, index, curray) {
            return acumulator - currentValue;
        })
        expect(result).toBe(3);
    })
    it('applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value. CASE: mult', function() {
        var curray = new Curray(1,2,3);
        var result = curray.reduceRight(function(acumulator, currentValue, index, curray) {
            return acumulator * currentValue;
        })
        expect(result).toBe(6);
    })
    it('applies a function against an accumulator and each value of the array (from right-to-left) to reduce it to a single value. CASE: div', function() {
        var curray = new Curray(2,2,12);
        var result = curray.reduceRight(function(acumulator, currentValue, index, curray) {
            return acumulator / currentValue;
        })
        expect(result).toBe(3);
    })
})