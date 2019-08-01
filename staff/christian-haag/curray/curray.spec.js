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

    describe('entries', function () {
        it('Schould return key/value pairs of an array of strings', function () {
            var curray = new Curray('a', 'b', 'c', 'd')

            var result = curray.entries()

            expect(result).toEqual([[0, 'a'], [1, 'b'], [2, 'c'], [3, 'd']])
        });
    });

    describe('map', function () {
        it('Should Multiply numbers by 10', function () {
            var curray = new Curray(1, 2, 3, 4)
            var coeficient = 10
            var result = []

            curray.map(function (element) {
                result.push(element * coeficient)
            })

            expect(result).toEqual([10, 20, 30, 40])
        })

        it('Should add <>', function () {
            var curray = new Curray(1, 2, 3, 4);
            var result = []

            curray.map(function (element) {
                result.push('<' + element + '>')
            });

            expect(result).toEqual(['<1>', '<2>', '<3>', '<4>']);

        })

        it('Should return value-index-array', function () {
            var curray = new Curray(1, 2, 3)
            var result = []

            curray.map(function (element, index, curray) {
                var objCurray = []

                curray.map(function (element) {
                    objCurray.push(element)
                })
                result.push(element + '--' + index + '--' + objCurray)
            })

            expect(result).toEqual(['1--0--1,2,3', '2--1--1,2,3', '3--2--1,2,3'])
        })


        it('Should fail on No arguments error', function () {
            var curray = new Curray();

            expect(function () {
                curray.map();
            }).toThrowError(TypeError, 'missing argument 0 when calling function Map')

        });


        it('Schould fail on Not a Function error', function () {
            var curray = new Curray(1, 2, 3, 4)

            expect(function () {
                curray.map(null)
            }).toThrowError(TypeError, 'null is not a function')

        });

    });

    describe('flat', function () {
        it('should flat Curray one level', function () {
            var curray = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(null, NaN, undefined, new Curray(true, false))))

            var result = curray.flat()

            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', new Curray(null, NaN, undefined, new Curray(true, false))])
        });

        it('should flat Curray two levels', function () {
            var curray = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(null, NaN, undefined, new Curray(true, false))))

            var result = curray.flat(2)

            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', null, NaN, undefined, new Curray(true, false)])
        });

        it('should flat Curray three levels', function () {
            var curray = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(null, NaN, undefined, new Curray(true, false))))

            var result = curray.flat(3)

            expect(result).toEqual([1, 2, 3, 'a', 'b', 'c', null, NaN, undefined, true, false])
        });
    });

    describe('isArray', function () {
        it('should return true if Curray is an Object', function () {
            var curray = new Curray();
            var result = Curray.isCurray(curray);

            expect(result).toBe(true);
        });
        it('should return false if Curray is NOT an Object', function () {
            var noCurray = new Array();
            var result = Curray.isCurray(noCurray)

            expect(result).toBe(false);
        });
    });

    describe('concat', function () {
        it('schould return a new curray by joining two different currays', function () {
            var curray = new Curray(1, 2, 3, 4)
            var curray2 = new Curray(5, 6, 7, 8)

            var result = curray.concat(curray2);

            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8])

        });

        it('schould return a new curray by joining three different currays', function () {
            var curray = new Curray(1, 2, 3, 4)
            var curray2 = new Curray(5, 6, 7, 8)
            var curray3 = new Curray('a', 'b', 'c')

            var result = curray.concat(curray2, curray3);

            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 'a', 'b', 'c'])

        })

        it('schould flatten each curray one level', function () {
            var curray = new Curray([1, 2], 3, 4)
            var curray2 = new Curray(5, [6, 7], 8)
            var curray3 = new Curray('a', ['b', 'c'])

            var result = curray.concat(curray2, curray3);

            expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 'a', 'b', 'c'])

        })
    });

    describe('every', function () {
        it('should return TRUE when all elements in the curray pass the test', function () {
            var curray = new Curray(10, 20, 30);

            var result = curray.every(function (item) {
                return item > 9
            });

            expect(result).toBe(true);

        });

        it('should return TRUE when currya is empty', function () {
            var curray = new Curray();

            var result = curray.every(function (item) {
                return item > 9
            });

            expect(result).toBe(true);

        });

        it("should return FALSE when one elements in the curray don't pass the test", function () {
            var curray = new Curray(10, 20, 30);

            var result = curray.every(function (item) {
                return item > 40
            });

            expect(result).toBe(false);

        });

        it('Should return TypeError on X is not a function', function () {
            var curray = new Curray(10, 20, 30);

            expect(function () {
                curray.every();
            }).toThrowError('undefined is not a function')

        })
    });

    describe('flatMap', function () {
        it('Schould multiply numbers by 2 and flatten the array', function () {
            var curray = new Curray([1], [2], [3])

            var result = curray.flatMap(function (item) {
                return item * 2
            });

            expect(result).toEqual([2, 4, 6])
        });

    });

    describe('includes', function () {
        it('should search for an item and return TRUE if item is found in the curray', function () {
            var curray = new Curray(1, 2, 3, 4)

            var result = curray.includes(3)

            expect(result).toBe(true);
        });

        it('should search for an item and return FALSE if item is NOT found in the curray', function () {
            var curray = new Curray(1, 2, 3)

            var result = curray.includes(5)

            expect(result).toBe(false);
        });

        it('should search for a specific word and return TRUE if it exists in our curray', function () {
            var curray = new Curray('cat', 'rat', 'bat');

            var result = curray.includes('rat');

            expect(result).toBe(true);
        });

        it('Start from a given index and return TRUE if word exist in that range', function () {
            var curray = new Curray('cat', 'rat', 'bat');

            var result = curray.includes('rat', 1);

            expect(result).toBe(true);
        });

        it('Start from a given index and return FALSE if word NOT exist in that range', function () {
            var curray = new Curray('cat', 'rat', 'bat');

            var result = curray.includes('cat', 1);

            expect(result).toBe(false);
        });
    });

    describe('indexOf', function () {
        it('should return index of the searched value', function () {
            var curray = new Curray(10, 20, 30, 40, 50);

            var result = curray.indexOf(30);

            expect(result).toBe(2)
        });

        it('Should return -1 if value does not exist', function () {
            var curray = new Curray(10, 20, 30, 40, 50);

            var result = curray.indexOf(60);

            expect(result).toBe(-1);
        });

        it('schould accept negative parameters and look for the value in a given range', function () {
            var curray = new Curray(10, 20, 30, 40, 50);

            var result = curray.indexOf(30, -4);

            expect(result).toBe(2);
        });

        it('should accept parameter to search for the value starting at a given index', function () {
            var curray = new Curray(10, 20, 30, 40, 50);

            var result = curray.indexOf(40, 2);

            expect(result).toBe(3);
        });

    });

    describe('join', function () {
        it('Should  return a new string by concatenating all of the elements in our curray', function () {
            var curray = new Curray('This', 'is', 'Spartaaaaa!')

            var result = curray.join('+')

            expect(result).toBe('This+is+Spartaaaaa!')
        });

        it('Should return a new string concatenated with a comma if no separator is passeed', function () {
            var curray = new Curray('This', 'is', 'Spartaaaaa!')

            var result = curray.join()

            expect(result).toBe('This,is,Spartaaaaa!')
        });

        it('Should join all elements if empty string is passed', function () {
            var curray = new Curray('This', 'is', 'Spartaaaaa!')

            var result = curray.join('')

            expect(result).toBe('ThisisSpartaaaaa!')
        });
    });

    describe('lastIndexOf', function () {
        it('should return last index of the searched value', function () {
            var curray = new Curray(10, 30, 2, 30, 50);

            var result = curray.lastIndexOf(30);

            expect(result).toBe(3)
        });

        it('Should return -1 if value does not exist', function () {
            var curray = new Curray(10, 30, 30, 40, 50);

            var result = curray.lastIndexOf(60);

            expect(result).toBe(-1);
        });

        it('schould accept negative parameters and look for the value in a given range', function () {
            var curray = new Curray('kit', 'kat', 'kut', 'kat', 'kitty');

            var result = curray.lastIndexOf('kat', -4);

            expect(result).toBe(3);
        });

        it('should accept parameter to search for the value starting at a given index and return the last found index', function () {
            var curray = new Curray(10, 5, 3, 40, 5, 15);

            var result = curray.lastIndexOf(5, 2);

            expect(result).toBe(4);
        });

    });

    describe('reverse', function () {
        it('Should reverse the original curray', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6)

            var result = curray.reverse()

            expect(result).toEqual(new Curray(6, 5, 4, 3, 2, 1))
        })
    });

    describe('shift', function () {
        it('should delete the first index in our curray', function () {
            var curray = new Curray(1, 2, 3, 4, 5)

            var result = curray.shift();

            expect(result).toBe(1);
        })

        it('Case 2: it should delete the first index of our curray', function () {
            var curray = new Curray(2, 3, 4, 5, 6);

            var result = curray.shift()

            expect(result).toBe(2);
        })

        it('should return the original modified curray', function () {
            var curray = new Curray(1, 2, 3, 4, 5)
            //I implement parameter only to show the resulting curray.
            var result = curray.shift('originalCurray');

            expect(result).toEqual(curray)
        });

        it('should return undefined when the curray lengths is 0', function () {
            var curray = new Curray()

            var result = curray.shift();

            expect(result).toEqual([undefined]);

        })
    });

    describe('slice', function () {
        it('should return a copy of a part of the curray between a start value and  an end value', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6);

            var result = curray.slice(1, 4);

            expect(result).toEqual([2, 3, 4])
        });

        it('should return a part of the curray if a negative start value is given, counting backwards cutting the array from that position onwards', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6);

            var result = curray.slice(-3);

            expect(result).toEqual([4, 5, 6]);
        })

        it('If only the starting parameter is given it will cut from there on to the end of the currat', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6)

            var result = curray.slice(2)

            expect(result).toEqual([3, 4, 5, 6])
        })
    });

    describe('some', function () {
        it('should return TRUE when some elements in the curray pass the test', function () {
            var curray = new Curray(1, 2, 3, 4, 5);

            var result = curray.some(function (item) {
                return item % 2 === 0
            });

            expect(result).toBe(true);

        });

        it('should return TRUE when currya is empty', function () {
            var curray = new Curray();

            var result = curray.some(function (item) {
                return item > 9
            });

            expect(result).toBe(true);

        });

        it("should return FALSE when no condition is met", function () {
            var curray = new Curray(10, 20, 30);

            var result = curray.some(function (item) {
                return item > 40
            });

            expect(result).toBe(false);

        });

        it('Should return TypeError on X is not a function', function () {
            var curray = new Curray(10, 20, 30);

            expect(function () {
                curray.some();
            }).toThrowError('undefined is not a function')

        })
    });

    describe('toString', function () {
        it('should return a string representing the specified array and its elements', function () {
            var curray = new Curray(1, 2, 'a', 'b3');

            var result = curray.toString();

            expect(result).toBe('1,2,a,b3');
        })
    })

    describe('unshift', function () {
        it('sould add one or more elements to the beginning of an array and returns the new length of the array', function () {
            var curray = new Curray(1, 2, 3, 4)

            var result = curray.unshift(5, 6, 7);

            expect(result).toEqual(7);
        });

        it('sould add one or more elements to the beginning of an array and returns the new length of the array', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 'aa', 'b')

            var result = curray.unshift(5, 6, 10, 'as', 'sz');

            expect(result).toEqual(12);
        });
    });

    describe('keys', function () {
        it('should return a new Curray that contains the keys for each index in the array', function () {
            var curray = new Curray('kat', 'ket', 'kit', 'kot', 'kut')

            var result = curray.keys()

            expect(result).toEqual(['0', '1', '2', '3', '4', 'length'])
        });

    });

    describe('reduce', function () {
        it('should executes a reducer function on each element of the array, resulting in a single output value', function () {
            var curray = new Curray(1, 2, 3, 4)

            var result = curray.reduce((function (accumulator, currentValue) {
                return accumulator + currentValue
            }));

            expect(result).toBe(10)
        });

        it('should accept an initialValue and calculate over that value resulting in a single output value', function () {
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.reduce((function (acc, currVal) {
                return acc + currVal;
            }), 10);

            expect(result).toBe(20);
        });

        it('should multiply all the values of the curray and return a single value', function () {
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.reduce((function (acc, currVal) {
                return acc * currVal;
            }));

            expect(result).toBe(24)
        })
    });

    describe('reduceRight', function () {
        it('should executes a reducer function on each element of the array, starting from the last index to the first, resulting in a single output value', function () {
            var curray = new Curray(1, 2, 3, 4)

            var result = curray.reduceRight((function (accumulator, currentValue) {
                return accumulator + currentValue
            }));

            expect(result).toBe(10)
        });

        it('should accept an initialValue and calculate over that value resulting in a single output value', function () {
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.reduceRight((function (acc, currVal) {
                return acc + currVal;
            }), 10);

            expect(result).toBe(20);
        });

        it('should multiply all the values of the curray and return a single value', function () {
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.reduceRight((function (acc, currVal) {
                return acc * currVal;
            }));

            expect(result).toBe(24)
        })
    });

    describe('sort', function () {
        it('should sorts the elements of an array in place and returns the sorted array. Case: numbers', function () {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function (a, b) {
                return a - b;
            });
            var resultArr = Array.from(result);
            expect(resultArr).toEqual([1, 2, 3, 3, 4, 5]);
        });
        it('should sorts the elements of an array in place and returns the sorted array. Case: numbers', function () {
            var curray = new Curray(5, 3, 3, 2, 1, 4);
            var result = curray.sort(function (a, b) {
                return b - a;
            });
            var resultArr = Array.from(result);
            expect(resultArr).toEqual([5, 4, 3, 3, 2, 1]);
        });
        it('should sorts the elements of an array in place and returns the sorted array. Case: words', function () {
            var curray = new Curray('d', 'a', 'c', 'b', 'e');
            var result = curray.sort(function (a, b) {
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




});