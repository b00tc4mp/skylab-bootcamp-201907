let result0=true;
function bingo(){
    //var gamer=prompt("What´s your name?");
    let result=true;
    let resFat=true;
    while(resFat){
        let count=0
        let carton=nums();
        let control=[true,true,true];
        while(result&&result0){
            count++;
            repeat(carton,control);
            result=confirm("Do you want to repeat the turn?")
        }
        console.log(`There are ${count} shifts.`)
        resFat=confirm("Do you want game again?");
        result0=true;
        result=true;
    }
}
function repeat(arr,control){
    console.log(arr.slice(0,5).toString()+"\n"+arr.slice(5,10).toString()+"\n"+arr.slice(10,15).toString());
    let pivot=(Math.random()*100).toFixed();
    pivot==0?pivot=(Math.random()*100).toFixed():null;
    alert(pivot);
    arr.indexOf(pivot)!=-1?arr[arr.indexOf(pivot)]="X":null;
    arr.slice(0,5).every((elemento)=>elemento=="X")&&control[0]?(console.log("LINE 1"),control[0]=false):null;
    arr.slice(5,10).every((elemento)=>elemento=="X")&&control[1]?(console.log("LINE 2"),control[1]=false):null;
    arr.slice(10,15).every((elemento)=>elemento=="X")&&control[2]?(console.log("LINE 3"),control[2]=false):null;
    control.every((elemento)=>elemento==false)?(console.log("END")):null;
    if(control.every((elemento)=>elemento==false)){
        console.log("END");
        return result0=false;
    }
    console.log(arr.slice(0,5).toString()+"\n"+arr.slice(5,10).toString()+"\n"+arr.slice(10,15).toString());
}
function nums(){
    let carton=[]
    let aux=0;
    for(let i=0;i<15;i++){
        aux=(Math.random()*100).toFixed();
        if(aux==0||carton.indexOf(aux)!=-1){
            carton[i]=(Math.random()*100).toFixed();
            continue;
        }
        carton[i]=aux;
    }
    return carton;
}
bingo()
