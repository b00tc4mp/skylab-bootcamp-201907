suite('findIndex' , function(){
   var fruitsArray = ['bananas' , 'watermelon' , 'oranges' , 'strawberries' , 'cherries'];

   test('match found: returns index is 3' , function(){
      var result = findIndex(fruitsArray , function(item){
         return item === 'strawberries';
      });
      check(result , 3);
   });

   test('match found: returns index 0' , function(){
      var result = findIndex(fruitsArray , function(item){
         return item === 'bananas';
      });
      check(result , 0);
   });

   test('match not found. returns -1' , function(){
      result = findIndex(fruitsArray , function(item){
         return item === 'plum';
      })
      check (result , -1);
   })

   test('no arguments' , function(){
         findIndex();
      },function(error){
         check(error instanceof TypeError , true);
         check(error.message , "missing argument 0 when calling function");
   });

   test('not an array' , function(){
      findIndex(2);
   }, function(error){
      check(error instanceof TypeError ,true);
      check(error.message , "2 is not an array");
   })

   test ('not a function' , function(){
      findIndex(fruitsArray , 8);
   }, function(error){
      check(error instanceof TypeError , true);
      check(error.message , "8 is not a function");
   })
});