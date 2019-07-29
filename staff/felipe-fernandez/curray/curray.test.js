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


    describe('fill', function() {
        it('fill all the items with the input passed to a fill from the start index you passed', function () {
           
            var curray = new Curray(1, 2, 3, 4, 5);
    
            var result = curray.fill(5, 1);
            
            var expected = [1, 5, 5, 5, 5];

            //we do a for loop in order to compare the items of the arrays
            //because with expectArrays we can't compare arrays with Objects(result is an Object)
             for(var i=0; i<result.length; i++){
                expect(result[i], expected[i]);
            }


        });
        
         it ('fill all the items with the input passed to a fill from the start index you passed', function(){
   
            var curray = new Curray(1, 2, 3, 4, 5);
            
            var result2 = curray.fill(5);
            var expected =  [5, 5, 5, 5, 5];

            //we do a for loop in order to compare the items of the arrays
            //because with expectArrays we can't compare arrays with Objects(result is an Object)
            var arrResult = Array.from(result2)
            expectArrays(arrResult, expected); 

          
         });
        //error case with fill
        it('has no arguments', function (){
            var curray = new Curray();
            curray.fill();
        }, function (error){
            expect(error.message, 'missing argument 0 when calling function fill');
    
        });

   

    });

       
    describe('filter', function (){
        it('filter all the items who accomplish the condition passed as a function', function(){
            
            var curray = new Curray('hol', 'adi', 'guanchope','cosita','manomens');
                
            var result = curray.filter(function(val){
                return val.length >= 4;
            });
            var expected=['guanchope','cosita','manomens'];
            var arrResult = Array.from(result)
            expectArrays(arrResult, expected); 

            
    
        });

        it('filter all the items who accomplish the condition passed as a function', function (){

            var curray = new Curray (1,2,3,4,5,6);
                                
            var result2 = curray.filter(function(val){
                return val < 4;
            });

            var expected=[1,2,3];
            var arrResult = Array.from(result2)
            expectArrays(arrResult, expected); 

            
        });
    


        it('has no arguments', function (){
            var curray = new Curray();
            curray.filter();
        }, function (error){
            
            expect(error.message, 'missing argument 0 when calling function filter');
    
        });
    
    });
    

    describe('every', function(){
        
        it('check if the value passed is the same of all the items of an array', function(){
            var curray = new Curray ('a', 'a', 'a');

            var result = curray.every(function(val){
                return val === 'a';
            });
    
            expect(result, true);
        });


        it('check if the value passed is the same of all the items of an array', function(){

        var curray =new Curray (1,2,3,4)
        var result2 = curray.every(function(val){
            return val === 1;
        });
        
          expect(result2, false);

    });

        it('has no arguments', function (){
            var curray = new Curray();
            curray.every();
        }, function (error){
            
            expect(error.message, 'missing argument 0 when calling function every');
    
        });


    });
  
  
   
});