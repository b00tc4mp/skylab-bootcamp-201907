'use strict';

describe('Curray', function() {
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
    
            expectArrays(outputs, [
                ['a', 0, curray],
                ['b', 1, curray],
                ['c', 2, curray]
            ]);
        });
    });

    describe('toString', function(){
        it('should convert something to string', function() {
            var curray = new Curray(1, 2, 3);

            var result = curray.toString();

            expect(result, "1,2,3")
        })

        it('should convert several data types, except another array', function(){
            var curray = new Curray(6, 'bb', 'pepe', 6);
    
            var result2 = curray.toString();
            expect(result2, "6,bb,pepe,6");
        })

        it('should convert several data types and an array', function(){
            var curray = new Curray(6, 'bb', 'pepe', 6, [4, 'diez', 33]);

            var result3 = curray.toString();
            expect(result3, "6,bb,pepe,6,4,diez,33");
        });

        it('should launch a handleError when using undefined as parameter', function(){
            var curray = new Curray();

           curray.toString();
        }, function(error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'No se puede leer la propiedad "length" de undefined');
        });

        it('should launch a handleError when using null as parameter', function(){
            var curray = new Curray(null);
            // var result = null;

            curray.toString();
        }, function(error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'No se puede convertir a string un objeto null');
        });


    })

    describe('fill', function(){
        it('should fill all parameters (mandatory and optional)', function(){
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.fill(0, 2, 4);
            var expected = [1, 2, 0, 0];

            for (var i = 0; i < result.length; i++){
                expect(result[i], expected[i]);
            }

            // expectArrays(result, [1, 2, 0, 0]);
        })

        it('should call fill whitout end parameter', function(){
            var curray = new Curray(1, 2, 3, 4);

            var result = curray.fill(5,1);
            var expected = [1, 5, 5, 5];

            for (var i = 0; i < result.length; i++){
                expect(result[i], expected[i]);
            }
        })

        it('should call fill just using mandatory parameter', function(){
            var curray = new Curray(1,2,3,4);

            var result = curray.fill(6);
            var expected = [6, 6, 6, 6];

            for (var i = 0; i < result.length; i++){
                expect(result[i], expected[i]);
            }
        })

        it('should launch a handleError when is not a curray', function(){
            var curray = new Curray;
            curray.fill();


        }, function(error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'fill debe contener al menos un parámetro');
        })
    })

    // describe('unshift', function(){
    //     it('should add new elements to the begining of a curray', function(){
    //         var curray = new Curray(1,2,3);

    //         result

    //     })



    // })

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