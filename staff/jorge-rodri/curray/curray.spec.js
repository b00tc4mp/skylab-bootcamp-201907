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

        it('should fail on no arguments', function() {
            var curray = new Curray();

            expect(function() {
                curray.forEach();
            }).toThrowError(TypeError, 'missing argument 0 when calling function forEach');
        });
    });

    describe('concat', function(){
        it('no arguments', function(){
            var curray1 = new Curray(1,2,3);
            expect(function(){
                curray1.concat();
            }).toThrowError(ReferenceError,'missing argument 0 when calling function concat');
        })
        it('param is no Curray', function(){
            var curray1 =[1,2,3];
            var curray2 = new Curray(4,5,6);
            expect(function(){
                curray2.concat(curray1);
            }).toThrowError(TypeError, 'param is not Curray');
        })
        it('Curray is empty', function(){
            var curray1 =new Curray();
            var curray2 = new Curray(4,5,6);
            expect(function(){
                curray1.concat(curray2);
            }).toThrowError(ReferenceError, 'Curray is empty')
        })
        it('should create new curray with iterable object', function(){
            var curray1 = new Curray(1,2,3);
            var curray2 = new Curray(4,5,6);
            var result = curray1.concat(curray2); 
            result=Array.from(result);
            expect(result).toEqual([1,2,3,4,5,6]);
        })
    })

    describe('isArray', function(){
        it('arguments is not curray',function(){
            var curray=new Curray(1,2,3);
            var result=curray.isCurray();
            expect(result).toBe(true);
        })
    })

    describe('every', function(){
        it('should capture the element success', function(){
            var curray = new Curray(1,2,3,4);
            var result=curray.every(function(x){return x<4})
            expect(result).toBe(false);
        });
        it('all elements fulfill the conditions', function(){
            var curray = new Curray(1,2,3,4);
            var result=curray.every(function(x){return x<5})
            expect(result).toBe(true);
        });
    })

    describe('fill', function(){
        it('should add single element y all array', function(){
            var curray= new Curray(1,2,3,4,5);
            var result=Array.from(curray.fill(4));
            expect(result).toEqual([4,4,4,4,4])
        })
        it('should add element on the position indicate', function(){
            var curray= new Curray(1,2,3,4,5);
            var result=Array.from(curray.fill(4,2));
            expect(result).toEqual([1,2,4,4,4]);
        });
        it('should add element on the position indicate and end in other', function(){
            var curray= new Curray(1,2,3,4,5);
            var result=Array.from(curray.fill(4,2,5));
            expect(result).toEqual([1,2,4,4,4]);
        });
    })

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

    describe('map', function () {
        it('multiply by 10 all items', function () {
            var curray1 = new Curray (1, 2, 3);
   

            var result = curray1.map(function (value) { return value * 10; });
           result=Array.from(result)
           expect(result).toEqual([10, 20, 30]);
        });
   
         it('wrap each element between <>', function () {
             var curray1 = new Curray ('1', '2', '3');

             var result = [];
   
             result = curray1.map(function (value) { return '<' + value + '>'; });
             result=Array.from(result)
             expect(result).toEqual(["<1>", "<2>", "<3>"]);
         });
         
         it('should fail on no arguments', function() {
           var curray1 = new Curray();

           expect(function() {
               curray1.map();
           }).toThrowError(TypeError, 'missing argument 0 when calling function map');
        });
    });
    describe('find', function(){
        it('find the firs element that meets whit the conditions.', function(){
            var curray1=new Curray(1,2,3,4,5,6);
            var result= curray1.find(function(x){
                return x==3;
            });
            expect(result).toBe(3);
        });
    });
    describe('findIndex', function(){
        it('return the index that meet the condition', function(){
            var curray1=new Curray(1,2,3,4,5);
            var result=curray1.findIndex(function(x){
                return x==3;
            })
            expect(result).toBe(2);
        })
    })
    describe('includes', function(){
        it('return the element that meet in the matrix', function(){
            var curray1= new Curray("Jorge", "Rodriguez", "Sanchez");
            var result=curray1.includes("Rodriguez");
            expect(result).toBe(true);
        })
    })
    describe('unshift', function(){
        it('correct length', function(){
            var curray = new Curray(1,2,3,4);
            var result=curray.unshift(0);
            expect(result).toBe(5);
        })
        it('correct insert curray', function(){
            var curray = new Curray(1,2,3,4);
            curray.unshift(0)
            expect(Array.from(curray)).toEqual([0,1,2,3,4]);
        })
        it('correct insert curray', function(){
            var curray = new Curray(1,2,3,4);
            curray.unshift(-1,0)
            expect(Array.from(curray)).toEqual([-1,0,1,2,3,4]);
        })
    })
    describe('reduce', function(){
        it('correct add curray', function(){
            var curray = new Curray(0,1,2,3,4);
            var result = curray.reduce(function(a,b){
                return a+b;
            })
            expect(result).toBe(10);
        })
        it('correct multiply curray', function(){
            var curray =  new Curray(1,2,3,4);
            var result = curray.reduce(function(a,b){
                return a*b;
            });
            expect(result).toBe(24);
        })
    });


    describe('copyWithin', function () {
        it('should copy part of the curray whouth changing the lenght', function () {
            var curray1 = new Curray();

            curray1 = ([1, 2, 3]);

            var result = curray1.copyWithin(1, 2);
            expect(result).toEqual([1, 3, 3]);
        });
    });
    describe('arrayOf', function () {
        it('should introduce the arguments into a new curray', function () {
            var curray = new Curray(1, 2, 3, 'world', {}, NaN);

            var result = (curray).arrayOf();
            expect(Array.from(result)).toEqual([1, 2, 3, 'world', {}, NaN]);
        })
    });
    describe("join", function () {
        it('should join curray', function () {
            var curray = new Curray(1, 2, 3, 4, 5);
            curray = curray.join("-");

            expect(curray, "1-2-3-4-5");
        });
        it("put',' as separator", function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6, 7, 8, 9);
            curray = curray.join();

            expect(curray, "1,2,3,4,5,6,7,8,9");
        });
        it("convert the numb to string", function () {
            var curray = new Curray(1, 2, 3);
            curray = curray.join(0);

            expect(curray, "10203");
        });
    });
    describe('splice', function () {
        it('should delete some elements', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.splice(1, 1, 'a', 'b');

            expect(result).toEqual([1, "a", "b", 3, 4, 5, 6]);
        });

        it('empty curray', function () {
            var curray = new Curray(1, 2, 3, 4, 5, 6);
            var result = curray.splice();

            expect(result).toEqual([]);
        });
    })
    describe('sort', function () {
        it('must order curray', function () {
            var curray = new Curray('March', 'Jan', 'Feb', 'Dec');
            var result = curray.sort();

            expect(result).toEqual(["Dec", "Feb", "Jan", "March"]);
        });
    })

    describe('slice', function () {
        it('should break if first is not a number', function () {
            var curray = new Curray();
            expect(function () {
                curray.slice("a", 6);
            }).toThrowError(TypeError, 'a is not a number');
        });

        it('should should break if final is not undefined and is not a number', function () {
            var curray = new Curray();
            expect(function () {
                curray.slice(5, "b");
            }).toThrowError(TypeError, 'b is not a number');
        });
    })
    describe('reduceRight', function () {
        it('should apply a function against an accumulator and each value of curray from right to left', function () {
            var curray = new Curray('A', 'B', 'C');
            var result = '';
            var expected = 'CBA';

            result = curray.reduceRight(function (empty, current) {
                return empty + current;
            });
            for (var i in result) {
                expect(result[i], expected[i]);
            }

            expect(result).toEqual(expected);
        });

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.reduceRight();
            }).toThrowError(TypeError, 'missing argument 0 when calling function reduceRight');
        });

        it('should break when expression is not a function', function () {
            var curray = new Curray();
            expect(function () {
                curray.reduceRight('x');
            }).toThrowError(TypeError, 'x is not a function');
        });
    })

    it('should filter all the items who accomplish the condition introduced, case 2', function () {
        var curray = new Curray(1, 2, 3, 4, 5, 6);
        var result = curray.filter(function (x) {
            return x < 4;
        });

        expect(result).toEqual([1, 2, 3]);
    });

    it('should filter all the items who accomplish the condition introduced, case ', function () {
        var curray = new Curray(1, 2, 3, 4);
        var result = curray.filter(function (x) {
            return x > 5;
        });

        expect(result).toEqual([]);
    });

    it('should fail on no arguments', function () {
        var curray = new Curray();

        expect(function () {
            curray.filter();
        }).toThrowError(TypeError, 'missing argument 0 when calling function filter');
    });

    it('should break when expression is not a function', function () {
        var curray = new Curray();
        expect(function () {
            curray.filter('x');
        }).toThrowError(TypeError, 'x is not a function');
    });
    
    describe('some', function () {
        it('should iterate curray and evaluate an expression on at least one of its values', function () {
            var curray = new Curray(1, 3, 5, 7, 11, 15);
            var result = curray.some(function (element) {
                return element > 10
            });

            expect(result).toEqual(true);
        });

        it('should fail on no arguments', function () {
            var curray = new Curray();

            expect(function () {
                curray.some();
            }).toThrowError(TypeError, 'missing argument 0');
        });

        it('should break when expression is not a function', function () {
            var curray = new Curray();
            expect(function () {
                curray.some('x');
            }).toThrowError(TypeError, 'x is not a function');
        });
    })

    describe('shift', function () {
        it('should remove the first element from curray', function () {
            var curray = new Curray(1, 2, 3);
            var result = curray.shift();

            expect(result).toEqual(1);
        });
    })

    describe('reverse', function () {
        it('should reverse curray in place, case 1', function () {
            var curray = new Curray(1, 2, 3, 4, 5);
            var result = curray.reverse();

            expect(result).toEqual([5, 4, 3, 2, 1]);
        });

        it('should reverse curray in place, case 2', function () {
            var curray = new Curray(5, 4, 3, 2, 1);
            var result = curray.reverse();

            expect(result).toEqual([1, 2, 3, 4, 5]);
        });
    })
});