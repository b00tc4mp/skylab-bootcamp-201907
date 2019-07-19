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

    describe('concat', function(){
        it('no arguments', function(){
            var curray1 = new Curray(1,2,3);
            curray1.concat();
        }, function(error){
            expect(error instanceof ReferenceError, true);
            expect(error.message, 'missing argument 0 when calling function concat')
        })
        it('param is no Curray', function(){
            var curray1 =[1,2,3];
            var curray2 = new Curray(4,5,6);
            curray2.concat(curray1);
        }, function(error){
            expect(error instanceof TypeError, true);
            expect(error.message, 'param is not Curray');
        })
        it('Curray is empty', function(){
            var curray1 =new Curray();
            var curray2 = new Curray(4,5,6)
            curray1.concat(curray2)
        }, function(error){
            expect(error instanceof ReferenceError, true);
            expect(error.message, 'Curray is empty');
        })
        it('should create new curray with iterable object', function(){
            var curray1 = new Curray(1,2,3);
            var curray2 = new Curray(4,5,6);
            var result = curray1.concat(curray2);
            result=Array.from(result);
            expectArrays(result, [1,2,3,4,5,6]);
        })
    })

    describe('isArray', function(){
        it('arguments is not curray',function(){
            var curray=new Curray(1,2,3);
            var result=curray.isCurray();
            expect(result, true);
        })
    })
});