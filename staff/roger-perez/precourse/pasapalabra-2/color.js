function respuesta(){

     document.getElementById("pregunta").innerHTML = rosco.question;
    let preguntaLetra = document.getElementById("respuesta").value
    preguntaLetra = preguntaLetra.toLowerCase()
    resp = preguntaLetra
    if(rosco.status === 0){
        if(resp === rosco.answer){
                preguntas.shift()
                acertadas++;
                //alert('Correcto!');
                console.log(preguntas)

                document.getElementById("item").style.backgroundColor = 'green'
                document.getElementById("item").id = 'hecho'
               

                

        }
        else if(resp === 'pasapalabra') {
            let sacado = []
            rosco.status = 4
            sacado.push(preguntas[0])
            preguntas.shift()
            preguntas.push(sacado[0])
            console.log(preguntas)
            //alert('pasapalabra!');
            document.getElementById("item").style.backgroundColor = 'orange'
            
            document.getElementById("item").id = 'pasapalabra'
            document.getElementById("pasapalabra").className ="claseCambiada"
           


            
       
               
        }
         else{
            preguntas.shift()
            //alert(`Fallaste!, la respuesta es: ${rosco.answer}`);
            falladas++;
            document.getElementById("item").style.backgroundColor = 'red'
            document.getElementById("item").id = 'hecho'
            
           
        }

    }
    else if(rosco.status === 4){
        if(resp === rosco.answer){
                preguntas.shift()
                acertadas++;
                //alert('Correcto!');
                console.log(preguntas)

                document.getElementById("pasapalabra").style.backgroundColor = 'green'
                document.getElementById("pasapalabra").id = 'hecho'
               

                

        }
        else if(resp === 'pasapalabra') {
            let sacado = []
            rosco.status = 4
            sacado.push(preguntas[0])
            preguntas.shift()
            preguntas.push(sacado[0])
            console.log(preguntas)
            //alert('pasapalabra!');
            document.getElementById("pasapalabra").style.backgroundColor = 'orange'
            
            document.getElementById("item").id = 'pasapalabra'
            //document.getElementById("pasapalabra").className ="claseCambiada"
           


            
       
               
        }
         else{
            preguntas.shift()
            //alert(`Fallaste!, la respuesta es: ${rosco.answer}`);
            falladas++;
            document.getElementById("pasapalabra").style.backgroundColor = 'red'
            document.getElementById("pasapalabra").id = 'hecho'
            
           
        }{

    }
       
    soloPasapalabra()
    rosco = preguntas.find(function(element) {
    return element.status === 0 ;
    });
    // document.getElementsByTagName("claseCambiada").id='item'
    pregunta()
    
    

}

/*function soloPasapalabra(){
    if(preguntas.every(item => item.status === 4 )){
        preguntas.map(item => {
            item.status = 0
        })
       
    }

}*/
      

