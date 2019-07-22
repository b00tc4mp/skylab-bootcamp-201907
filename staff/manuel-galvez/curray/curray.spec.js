'use strict';

describe('Curray', function() {

    describe('push', function() {
        it(
            'should push a string to the end of Curray', function() {
            var curray = new Curray();
            var result = curray.push('hola mundo');
            expect(curray[0]).toBe('hola mundo');
            expect(result).toBe(1);
        });
        it(
            'should push a curray to the end of curray', function() {
            var curray = new Curray(1,2);
            var result = curray.push(new Curray(1,2,3,4));
            expect(curray).toEqual(new Curray(1,2,new Curray(1,2,3,4)));
            expect(result).toBe(3);
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
            'should pop a curray from the end of curray', 
            function() {
                var curray = new Curray('hola', new Curray(1,2));
                var result = curray.pop();

                expect(result).toEqual(new Curray(1,2));
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
        it('should iterate through each element of curray push value, index and curray', function () {
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

    it('should iterate through each element of curray and concatenate each index and value in a string', function () {
            var curray = new Curray('a', 'b', 'c');
    
            var outputs = '';
    
            curray.forEach(function (element, index, curray) {
                outputs += index + '-' + element
            });
    
            expect(outputs).toBe('0-a1-b2-c')
        });

        it(
            'should capture no arguments error',
            function () {
                var curray = new Curray('a', 'b', 'c');
                var outputs = [];
                expect(function() {
                    curray.forEach();
                }).toThrowError(TypeError, 'an expression should be passed as argument to forEach')
            });
        
        it(
            'should capture if argument passed is not a expression (function)',
            function () {
                var curray = new Curray('a','b','c');
                expect(function() {
                    curray.forEach('notAExpression');
                }).toThrowError('notAExpression is not a function')
            }
        )
    });


    describe('indexOf', function() {
        it(
            'should get index of an element (string)',
            function() {
                var curray = new Curray('ant', 'bison', 'camel', 'duck', 'bison');
                var result = curray.indexOf('camel');
                expect(result).toBe(2);
            });

        it(
            'should get index of an element (object)',
            function() {
                var curray = new Curray('ant', 'bison', new Curray(1,2,3), 'duck', 'bison');
                var result = curray.indexOf(new Curray(1,2,3));
                expect(result).toBe(2);
            });

        it(
            'should return -1 when no arguments are provided',
            function() {
                var curray = new Curray('ant', 'bison', new Curray(1,2,3), 'duck', 'bison');
                var result = curray.indexOf();
                expect(result).toBe(-1);
            });

        });

    describe('reduce', function() {
        it(
            'sum all items in curray of numbers',
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
            'concat all elements in curray of strings and numbers',
            function() {
                var curray = new Curray('a','b',3,4,'c');
                var result = curray.reduce(
                    function(accumulator, val) {
                        return accumulator + val
                    }
                );
                expect(result).toBe('ab34c');
            });
        

        it(
            'should throw an error when wrong number of arguments is provided',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.reduce()
                }).toThrowError(TypeError, 'Wrong number of arguments: two expected (Callback function, initialValue).')
            });
        it(
            'should throw an error when argument passed is not a function',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.reduce('thisIsNotAFunction')
                }).toThrowError(TypeError, 'First argument must be a callback function that takes 2 arguments (accumulator, value).')
            });
        it(
            'should throw an error when wrong number of arguments provided for callback function',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.reduce(function() {
                        return false;
                    });
                }).toThrowError(TypeError, 'Callback function must have two arguments (accumulator, value).')
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

         it(
            'concat all elements in curray of strings and numbers',
            function() {
                var curray = new Curray('a','b',3,4,'c');
                var result = curray.reduceRight(
                    function(accumulator, val) {
                        return accumulator + val
                    }
                );
                expect(result).toBe('c43ba');
            });

        it(
            'should throw an error when wrong number of arguments is provided',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.reduceRight()
                }).toThrowError(TypeError, 'Wrong number of arguments: two expected (Callback function, initialValue).')
            });
        it(
            'should throw an error when argument passed is not a function',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.reduceRight('thisIsNotAFunction')
                }).toThrowError(TypeError, 'First argument must be a callback function that takes 2 arguments (accumulator, value).')
            });
        it(
            'should throw an error when wrong number of arguments provided for callback function',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.reduceRight(function() {
                        return false;
                    });
                }).toThrowError(TypeError, 'Callback function must have two arguments (accumulator, value).')
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
        
        it(
            'should throw error when no arguments are provided',
            function() {
                var curray = new Curray(5,10,15,20,25);
                expect(function() {
                    curray.every();
                }).toThrowError('an expression should be passed as argument to every()');
            });

        it(
            'should throw error when argument passed is not a function',
            function() {
                var curray = new Curray(5,10,15,20,25);
                expect(function() {
                    curray.every('aaaa');
                }).toThrowError('First argument must be a callback function that returns the result of an expression');
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

        it(
            'should join all elements in curray with a specific delimiter.',
            function() {
                var curray = new Curray('Fire', 'Air', 'Water');
                var result = curray.join('--');
                expect(result).toBe('Fire--Air--Water');
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
        it(
            'should return false when no arguments passed in',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.includes();
                expect(result).toBeFalsy();
            });
        it(
            'should return false when value passed in is not found in curray',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.includes(10);
                expect(result).toBeFalsy();
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
        
        it(
            'should throw and error when no arguments are passed in',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.map()
                }).toThrowError('an expression should be passed as argument to map()')
            });
        
        it(
            'should throw and error if argument provided is not a callback function',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.map('aaaa')
                }).toThrowError('First argument must be a callback function that returns the result of an expression')
            });
    });

    describe('keys', function() {
        it(
            'should return an array iterator with original curray indices as values',
            function() {
                var curray = new Curray('a','b','c','d');
                var result =  curray.keys();
                expect(result).toEqual(['a','b','c','d'][Symbol.iterator]());
        });

        it(
            'should return an array iterator with original curray indices as values (mixed values)',
            function() {
                var curray = new Curray('a',3,function(){},undefined);
                var result =  curray.keys();
                expect(result).toEqual(['a',3,function(){},undefined][Symbol.iterator]());
        });
    });

    describe('fill', function() {
        it(
            'should return modified curray with elements replaced by fill rules',
            function() {
                var curray = new Curray('a','b','c','d','e','f');
                var result =  curray.fill(0, 2, 4);
                expect(result).toEqual(new Curray('a','b',0,0,'e','f'));
        });

        it(
            'should return curray with elements replace with first parameter from second parameter index on',
            function() {
                var curray = new Curray('a','b','c','d','e','f');
                var result =  curray.fill(0, 2);
                expect(result).toEqual(new Curray('a','b',0,0,0,0));
        });

        it(
            'should return modified curray with all values replaced by argument provided',
            function() {
                var curray = new Curray('a','b','c','d','e','f');
                var result =  curray.fill(5);
                expect(result).toEqual(new Curray(5,5,5,5,5,5));
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

        it(
            'should return a curray iterator made of [index, value] (mixed values)',
            function() {
                var curray = new Curray('a',1,function(){},undefined);
                var result = curray.entries();
                expect(result).toEqual([[0,'a'], [1,1], [2,function(){}], [3,undefined]][Symbol.iterator]());
            });
        });
    
    describe('from', function() {
        it(
            'should return a new curray iterator from an Array-like iterable',
            function() {
                var result = Curray.from(['a', 'b', 'c', 'd']);
                var expected = new Curray('a', 'b', 'c', 'd');
                expect(result).toEqual(expected)
            });
        
        it(
            'should throw an error if no arguments provided',
            function() {
                expect(
                    function() {
                        Curray.from()
                    }).toThrowError('from() requires an iterable as first argument');
            });

        });
    
    describe('find', function() {
        it(
            'should return first value in curray that meets expression condition',
            function() {
                var curray = new Curray(5, 12, 8, 130, 44);
                var result = curray.find(function(elem) {
                    return elem > 10;
                });
                expect(result).toBe(12);
            });
        
        it(
            'should return undefined if no arguments provided to callback function',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.find(function() { return null});
                expect(result).toBeUndefined();
            });

        it(
            'should throw an error if no argument provided',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.find();
                }).toThrowError('find() requires a callback function as first argument')
            });

        it(
            'should throw an error if argument provided is not a function',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.find('aaaa');
                }).toThrowError('First argument must be a callback function that returns the result of an expression')
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

        it(
            'should return -1 if no arguments provided to callback function',
            function() {
                var curray = new Curray(1,2,3,4);
                var result = curray.findIndex(function() { return null});
                expect(result).toBe(-1);
            });
        
        it(
            'should throw an error if no argument provided',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.findIndex();
                }).toThrowError('findIndex() requires a callback function as first argument')
            });
        it(
            'should throw an error if argument provided is not a function',
            function() {
                var curray = new Curray(1,2,3,4);
                expect(function() {
                    curray.findIndex('aaaa');
                }).toThrowError('First argument must be a callback function that returns the result of an expression')
            });
        });

    describe('concat', function() {
        it(
            'should return a curray listing all elements from two different currays',
            function() {
                var curray1 = new Curray('a','b');
                var curray2 = new Curray({a:'hola', b:'mundo'}, [1,2,3], new Curray('x', 'y', 'z'));
                var result = curray1.concat(curray2);
                expect(result).toEqual(new Curray('a','b',{a:'hola', b:'mundo'}, 1,2,3,'x','y','z'))
            });
        });

    describe('shift', function() {
        it(
            'should pop and return the first element of a Curray',
            function() {
                var curray = new Curray('a','b','c','d','e');
                var result = curray.shift()
                expect(result).toBe('a');
            }
        )

        });
    
    describe('slice', function() {
        it(
            'should return a shallow copy of a portion of a Curray',
            function() {
                var curray = new Curray('a','b','c','d','e','f','g');
                var result = curray.slice(2, 5);
                expect(result).toEqual(new Curray('c','d','e'));
            });
        });
    
     describe('sort', function() {
        it(
            'should return sorted curray',
            function() {
                var curray = new Curray('d', 'a', 'c', 'b')
                var result = curray.sort(function(a, b) {
                    if (a > b) {
                        return 1
                    } else if (a < b) {
                        return -1
                    }
                    return 0
                });
                expect(result).toEqual(new Curray('a', 'b', 'c', 'd'));
            });

        });

       
    describe('some', function() {
        it(
            'should apply condition to each element of curray and return true if met',
            function() {
                var curray = new Curray(2, 4, 6, 8, 9);
                var result = curray.some(function(elem) {
                    return elem % 2 === 1;
                });
                expect(result).toBe(true);
            });
        });

    describe('sort', function() {
        it(
            'should return sorted curray',
            function() {
                var curray = new Curray(5,3,3,2,1,4)
                var result = curray.sort(function(a, b) {
                   return a - b;

                });
                expect(result).toEqual(new Curray(1,2,3,3,4,5));
            });

        });
    
    describe('sort', function() {
        it(
            'should return sorted curray',
            function() {
                var curray = new Curray(5,3,3,2,1,4)
                var result = curray.sort(function(a, b) {
                   return b - a;
                });
                expect(result).toEqual(new Curray(5,4,3,3,2,1));
            });

        });
    
    describe('filter', function() {
        it(
            'should return a new curray with all the elements that meet expression criteria',
            function() {
                var curray = new Curray(5, 8, 12, 15, 2, 23);
                var result = curray.filter(function(elem) {
                    return elem > 10;
                })
                expect(result).toEqual(new Curray(12, 15, 23));
            });
        });
    
    describe('toString', function() {
        it(
            'should return a string representing all the elements of the Curray',
            function() {
                var curray = new Curray(1,2,3,'a','b','c');
                var result = curray.toString();
                expect(result).toBe('1,2,3,a,b,c')
            });
        });
    
    describe('values', function() {
        it(
            'should return a new curray iterator object that contains the values for each index of the curray',
            function() {
                var curray = new Curray(1,2,3,4,5);
                var result = curray.values()
                expect(result).toEqual([1,2,3,4,5][Symbol.iterator]());
            });
        });
        
});
