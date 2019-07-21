'use strict';

const newLocal = '3';
describe('Curray', function () {
    describe('push', function () {
        it('should push a string', function () {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0]).toBe('hola mundo');
            expect(result).toBe(1);
        });
    });
    //************************************************************************************************ */
    describe('pop', function () {
        it('should pop a string', function () {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();
            expect(result).toBe('mundo');
            expect(curray.length).toBe(1);
            expect(curray[1]).toBeUndefined();
        });
    });
    //************************************************************************************ */
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
    //************************************************************************** */
    describe("toString",function(){
        it("should convert something to string",function(){
            var curray=new Curray(1, 2, 3);

            var result=curray.toString();
            expect(result).toEqual('1,2,3' );
        });

        it("should convert several data types expect another array", function(){
            var curray=new Curray(6, 'bb', 'pepe', 6);
            var result=curray.toString();
            expect(result).toEqual('6,bb,pepe,6');
        });

        it("should launch a handleError when using undefined as parameter", function(){
            var curray=new Curray();
            expect(function(){
                curray.toString();
            }).toThrowError(TypeError, "No se puede leer la propiedad length de undefined");
        });

        it("should launch a handleError when using a null as parameter", function (){
            var curray= new Curray(null);
            expect(function(){
                curray.toString();
            }).toThrowError(TypeError, 'No se puede convertir a string un objeto null');
        });
    });

    /**************************************************************************************** */
    describe("flat",function(){
        it("default", function(){
            var curray= new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(true, false)));
            var result=curray.flat();
            var expected = [1, 2, 3, 'a', 'b', 'c', new Curray(true, false)];
            result=Array.from(result);
            expect(result).toEqual(expected);
        });

        it("should handle error no array",function(){
            var curray=new Curray();
            expect(function(){
                curray.flat();
            }).toThrowError(TypeError, "No se puede convertir a string un objeto null");

        }); 

        /** PORQUE NO SALE EL ERROR DE BOOLEAN Y SOLO ERROR DE UNDEFINED? */
        it("should handle error bolean", function(){
            var curray=new Curray(true);
            expect(function(){
                curray.flat();
            }).toThrowError(TypeError, "No se puede convertir a string un objeto null");
        });
    });

    /***************************************************************************************** */
    describe("fill", function () {
        it("should fill all parameter (mandatory and optional", function () {
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.fill(0, 2, 4);
            console.log(result);
            var expected = [1, 2, 0, 0];
            for (var i = 0; i < result.length; i++) {
                expect(result[i]).toEqual(expected[i]);
            }
            //expectArrays(result, [1, 2, 0, 0]);
        });

        it("should handleError if not array", function () {
            var curray=new Curray();
            expect(function(){
                curray.fill(0, 2, 4);
            }).toThrowError(TypeError,' debe contener al menos un array y un caracter')
        });
    });

    
    /*************************************************************************** */
    describe('filter',function(){
        it("default",function(){
            var curray= new Curray('hol', 'adi', 'guanchope','cosita','manomens');
            var result = curray.filter(function(val){
                return val.length >= 4;
            });
            expect(result).toEqual([ 'guanchope', 'cosita', 'manomens' ]);

        });
        it("should handle no arguments",function(){
            var curray=new Curray();
            expect(function(){
                curray.filter(function(val){
                    return val.length>=4;
                });
            }).toThrowError(TypeError, "No se puede convertir a string un objeto null");
           
        });

    });

    /*************************************************************************** */
    describe("map",function(){
        it("default",function(){
            var curray=new Curray(1,2,3);
            var coeficient=10;
            var result = curray.map(function (value) { return value * coeficient; });
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
    /*************************************************************************** */
    describe("join",function(){
        it("default",function(){
            var curray=new Curray(1,2,3);
            var result=curray.join();
            expect(result).toEqual("1,2,3");
        });

    });
    /*************************************************************************** */
    describe("entries",function(){
        it("default",function(){
            var curray= new Curray(1,2,3);
            var result=curray.entries(1);
            expect(result).toEqual([ '0,1' ]);
        });
    });

    /*************************************************************************** */
    describe("every", function(){
        it("default",function(){
            function biggerThan(currentValue){
                return currentValue>40
            }

            var curray1=new Curray(1, 30, 39, 29, 10, 13);
            var result=curray1.every(biggerThan);
            expect(result).toBe(false);

        });
    });

    /*************************************************************************** */
    describe("indexof",function(){
        it("default",function(){
            var curray1=new Curray(1, 30, 39, 29, 10, 13);
            var result=curray1.indexOf(30);
            expect(result).toEqual("1");
        });
    });

    /***************************************************************************** */
    describe("keys",function(){
        it("default",function(){
            var curray1=new Curray('a', 'b', 'c');
            var result=curray1.keys();
            expect(result).toEqual('012');
        });
    });
    /***************************************************************************** */
    describe("reverse",function(){
        it("default",function(){
            var curray1=new Curray('one', 'two', 'three');
            var result=curray1.reverseTest();
            expect(result).toEqual(['three', 'two', 'one']);
        });
    });
    /***************************************************************************** */
    describe("slice",function(){
        it("default",function(){
            var curray1=new Curray('Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa');
            var result=curray1.sliceTest(1,3);
            expect(result).toEqual(['Pedro','Miguel']);
        });
    });
    /***************************************************************************** */
    describe("lastindexof",function(){
        it("default",function(){
            var curray=new Curray(1,3,4,3);
            var result=curray.lastIndexOf(3);
            expect(result).toEqual(3);
        });
    }); 
    /***************************************************************************** */
    describe('unshift', function(){
        it('should place new elements at the begining of an existing Curray', function(){
            var curray = new Curray(1,2,3);
    
            var result = Array.from(curray.unshift(4,5));
    
            expect(result).toEqual([4,5,1,2,3]);
        });
    
        it('should place new elements at the begining of an existing Curray (with strings, longer)', function(){
            var curray = new Curray(1,2,3,4,5,6);
    
            var result = Array.from(curray.unshift('a', 'b', 'c'));
    
            expect(result).toEqual(['a', 'b', 'c', 1,2,3,4,5,6]);
            console.log('curray = ' + curray);
            console.log(curray);
            console.log('result = ' + result);
            console.log(result);
        });
    
    });




    /* describe("findindex", function(){
        it("default",function(){
            
            function isLargeNumber(element) {
                return element > 13;
            }

            var array1=new Curray(5, 12, 8, 130, 44);
            var result=array1.findindex(isLargeNumber);
            expect(result).toEqual(3);
        })
    }) */

/*     describe("concat",function(){
        it("default",function(){
            var curray1 = new Curray('a', 'b', 'f');
            var curray2 = new Curray('d', 'e', 'f');
      
            var result = curray1.concat(curray2);
            expect(result).toEqual(["a", "b", "f", "d", "e", "f"]);
        });
    }); */

    /************************************************************************* */

    /** UNSHIFT */

    /*************************************************************************** */
/*     describe("copyWithin",function(){
        it("should default",function(){
            var curray=new Curray(0, 1, 2, 3, 4, 5, 6, 7);
            var result=curray.copyWithin(0, 2, 4);
            console.log(result);
            expect(result).toEqual([2, 3, 2, 3, 4, 5, 6, 7]);
        });
    }); */



});



