
    
    function sort(array){
        const l = array.length;
        let j, temp;
      
        for ( let i = 1; i < l; i++ ) {
            
          j = i;
          temp = array[ i ];
          while ( j > 0 && array[ j - 1 ] > temp ) {
            array[ j ] = array[ j - 1 ];
            j--;
          }
          array[ j ] = temp;
        }
      
        return array;
      };
      
   