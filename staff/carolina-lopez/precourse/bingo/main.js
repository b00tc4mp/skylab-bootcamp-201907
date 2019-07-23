function bingo(){
  var contador= 0;
  function getCarton(){ 
    var carton=[];

    while(carton.length < 15){ 
        var r = Math.floor((Math.random() * (30 - 1) +1));
        if((carton.indexOf(r) === -1)){
            carton.push(r);
            carton.sort(function(a,b){return a - b;});
        }
    }
    return carton;
  }
  var carton = getCarton();
  var linea1= carton.slice(0,5); 
  var linea2= carton.slice(5,10);
  var linea3= carton.slice(10,16);
  console.log(`Este es su carton:\n${linea1}\n${linea2}\n${linea3}`);

  function getBombo() {
    var numerosBombo = [];
    while(numerosBombo.length < 30){
      var n = Math.floor((Math.random() * (31-1) +1));
      if((numerosBombo.indexOf(n) === -1)){
        numerosBombo.push(n);
      }
    }
    return numerosBombo;
  };
  var numsBombo = getBombo();

  function getNum(){
  var num = numsBombo[Math.floor(Math.random() * numsBombo.length)];
  return num;
  };
  var numBombo = getNum();


  function checkNum() {
    var found = false
    for (let i = 0; i < linea1.length; i++) {
        if (linea1[i] === numBombo) {
          found = true
      } 
    }
    for (let i = 0; i < linea2.length; i++) {
      if (linea2[i] === numBombo) {
        found = true
    } 
    for (let i = 0; i < linea3.length; i++) {
      if (linea3[i] === numBombo) {
        found = true
    } 
  }
  }
    if(found) console.log(`¡${numBombo} ENCONTRADO!`);
    else console.log(`${numBombo} no encontrado`);
  }

  function changeNum() {
    var index1 = linea1.indexOf(numBombo);
    if (index1 !== -1) {
      linea1[index1] = 'X';
    }
    var index2 = linea2.indexOf(numBombo);
    if (index2 !== -1) {
      linea2[index2] = 'X';
    }
    var index3 = linea3.indexOf(numBombo);
    if (index3 !== -1) {
      linea3[index3] = 'X';
    }
    console.log(`Este es su carton:\n${linea1}\n${linea2}\n${linea3}`);
  }

  function deleteNum(){
    var index = numsBombo.indexOf(numBombo);
    if (index > -1){
      numsBombo.splice(index, 1);
    }
  }

  function checkLine(x){
    return x === 'X'
  }
  
  var contLine1 = false;
  var contLine2 = false;
  var contLine3 = false;

  var lineaCantada = false;

  function line1(){
    var a = linea1.every(checkLine);
    if(a){
      contLine1 = true;
      if(lineaCantada === false){
        console.log('¡LINEA!');
        lineaCantada = true;
      }
    }
    return a;
  }
  
  function line2(){
    var a = linea2.every(checkLine);
    if(a){
      contLine2 = true;
      if(lineaCantada === false){
        console.log('¡LINEA!');
        lineaCantada = true;
      }
    }
    return a;
  }
 
  function line3(){
    var a = linea3.every(checkLine);
    if(a){
      contLine3 = true;
      if(lineaCantada === false){
        console.log('¡LINEA!');
        lineaCantada = true; 
      }    
    }
    return a;
  }
  
  
  
  function newTurn() {
    numBombo = getNum();
    checkNum();
    changeNum();
    deleteNum();
    line1();
    line2();
    line3();
  }  
  
  do {
   var newConfirm = confirm('Otro número OK');
     if (newConfirm) {
       newTurn();
       contador += 1;
      } else{
        alert('¡Adios!')
      }
    } while ((newConfirm === true && contLine1 === false) || (newConfirm === true && contLine2 === false) || (newConfirm === true && contLine3 === false));
     

  function bye(){
    if(contLine1 === true && contLine2 === true && contLine3 === true){
      console.log(`¡BINGO! ¡FIN DEL JUEGO!`)
      console.log(`Has terminado tu partida en ${contador} rondas`);
      alert(`¡BINGO! ¡FIN DEL JUEGO!`)
    } 
  }
  bye(); 
}
bingo();  

  function newGame(){
    var newGameConf = confirm(`Nuevo juego`);
    if (newGameConf){
    bingo();
    } else {
      alert(`¡Adios!`)
    }
   
  }
  newGame();
  
