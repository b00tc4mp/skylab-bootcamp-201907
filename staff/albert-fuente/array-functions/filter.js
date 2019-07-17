function filter(array, condition) {

  newarrays=[];
  
  if (condition){
  
      for(var i=0;i<array.length;i++){
  
          if (array[i].length > condition){
              newarrays+= array[i] + ' ';
          }
       }
       return  newarrays;
      }
   else {
          return newarrays;
          }
  
  }
  
  
  




// var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

// const result = words.filter(word => word.length > 6);

// console.log(result);
// expected output: Array ["exuberant", "destruction", "present"]
