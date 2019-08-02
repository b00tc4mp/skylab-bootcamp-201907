'use strict';

describe('Curray', function () {
    describe('push', function () {
        it('should push a string', function () {
            var curray = new Curray();

            var result = curray.push('hola mundo');

            expect(curray[0], 'hola mundo');
            expect(result, 1);
        });

        it("should not take empty arguments",function(){
            var curray;
            var result=curray.push("hola mundo");
            expect(result, 'missing argument 0 when calling function forEach')
        });
    });
/************************************************************************************** */

    describe('pop', function () {
        it('should pop a string', function () {
            var curray = new Curray('hola', 'mundo');

            var result = curray.pop();

            expect(result, 'mundo');
            expect(curray.length, 1);
            expect(curray[1], undefined);
        });
    });

/*************************************************************************************** */

    describe('forEach', function () {
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

    /*********************************************************************************** */

    describe("fill", function () {
        it("should fill all parameter (mandatory and optional", function () {
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.fill(0, 2, 4);
            console.log(result);
            var expected = [1, 2, 0, 0];
            for (var i = 0; i < result.length; i++) {
                expect(result[i],expected[i])
            }
            //expectArrays(result, [1, 2, 0, 0]);
        });

        it("should handleError if not array", function () {
            var curray=new Curray()

            curray.fill(0, 2, 4);
        }, function(error){
            expect(error instanceof TypeError, true);
            expect(error.message,(' debe contener al menos un array y un caracter'));
        });


    });

/************************************************************************************** */

    describe("unshift",function(){
        it("should unshift the prameter (mandatory and optional)", function(){
            var curray= new Curray(1,2,3);
            var result=curray.unshifty(4,5);
            var expected=5;
            expect(result, expected);
        });
    });

//************************************************************************************ */
    describe("flat", function(){
        it("should flat the arrays", function(){
            var curray = new Curray (1, 2, 3, new Curray('a', 'b', 'c', new Curray(true, false)));

            var result=curray.flat();
            var expected=[1, 2, 3, 'a', 'b', 'c', [true, false]];
            for( var i=0; i<result.length;i++){
                expect(result[i], expected[i])
            }
        });
    });

//************************************************************************** */
    describe("toString",function(){
        it("should convert something to string",function(){
            var curray=new Curray(1, 2, 3);

            var result=curray.toString();
            expect(result, ('1,2,3' ));
        });

        it("should convert several data types expect another array", function(){
            var curray=new Curray(6, 'bb', 'pepe', 6);
            var result=curray.toString();
            expect(result, '6,bb,pepe,6');
        });

        it("should launch a handleError when using undefined as parameter", function(){
            var curray=new Curray()
            curray.toString();
        },function(error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'No se puede leer la propiedad length de undefined');

        });

        it("should launch a handleError when using a null as parameter", function(){
            var curray=new Curray(null);
            curray.toString();
        },function(error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'No se puede convertir a string un objeto null');
        });


    });





    describe('flat', function(){
        it('default', function(){
            var curray = new Curray(1, 2, 3, new Curray('a', 'b', 'c', new Curray(true, false)));

           var result=curray.flat()
            var expected = [1, 2, 3, 'a', 'b', 'c', new Curray(true, false)];
            // for (var i = 0; i < result; i++){
            //     expect(result[i], expected[i]);
            // }

            result=Array.from(result);
            expectArrays(result, expected);

        })


    })





});