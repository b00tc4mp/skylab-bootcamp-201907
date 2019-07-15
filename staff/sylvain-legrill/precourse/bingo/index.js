 var name = window.prompt("Welcome to Skylab Bingo! Please add your name:", "");
    document.write("Hello ", name);
   
   function bingo(){
       arr = [1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15]
              ;
       var count = 0
   
       function randomNum(min,max){
           return Math.floor(Math.random() * (max-min)+min)
        
       } randomNum(1,20)
       
   
       function arrReplaceNum(arr, num) {
           const index = arr.indexOf(num);
           if (index !== -1) {
               arr[index] = 'X';
               if(arr.join('').includes('XXXXX') === true ) {
                window.alert('LINEAAAAAAAAAAAAA! Well Done! ');            
             };
               
           }
           return arr;
       }
   
   
       function askNewTurn (){
        var num = randomNum(1,20)
        var confirmed = window.confirm(`Number ${num}! Turn #${count +=1}, Continue?`)
    
            if (confirmed) {
    
                console.log(arrReplaceNum(arr, num));
                askNewTurn();
            }
            else {
                alert ("The bingo is stopped.");
            }
        }
        askNewTurn()
 
   } bingo();
   
   
   
   
   
 

  
