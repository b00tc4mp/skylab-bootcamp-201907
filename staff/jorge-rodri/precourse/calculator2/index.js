let n1=document.getElementById('n1');
let n2=document.getElementById('n2');
let n3=document.getElementById('n3');
let n4=document.getElementById('n4');
let n5=document.getElementById('n5');
let n6=document.getElementById('n6');
let n7=document.getElementById('n7');
let n8=document.getElementById('n8');
let n9=document.getElementById('n9');
let n0=document.getElementById('n0');
let sum=document.getElementById('add');
let sub=document.getElementById('sub');
let mul=document.getElementById('mul');
let div=document.getElementById('div');
let eq=document.getElementById('equal');
let reset=document.getElementById('rest');
let screen=document.getElementById('screen');
let program=document.getElementById('pograma');
let a=0;
let b=0;
let ope="";
screen.textContent="";
program.onload=calc();

function calc(){
        enterNum()
        operador()
        eq.onclick=function(){
            b=screen.textContent;
            resolver();
        }
        reseteo();
}
function reseteo(){
    reset.onclick=function(){
        a=0;
        b=0;
        ope=0;
        screen.textContent="";
    }
}
function resolver(){
    let res=0;
    switch(ope){
        case"+":
            res=parseInt(a)+parseInt(b);
            screen.textContent=res;
        break;
        case"/":
            res=parseInt(a)/parseInt(b);
            screen.textContent=res;
        break;
        case"*":
            res=parseInt(a)*parseInt(b);
            screen.textContent=res;
        break;
        case"-":
            res=parseInt(a)-parseInt(b);
            screen.textContent=res;
        break;
        default:null;
    }
}

function operador(){
    sum.onclick=function(){
        a=screen.textContent;
        ope="+";
        screen.textContent="";
    }
    sub.onclick=function(){
        a=screen.textContent;
        ope="-";
        screen.textContent="";
    }
    mul.onclick=function(){
        a=screen.textContent;
        ope="*";
        screen.textContent="";
    }
    div.onclick=function(){
        a=screen.textContent;
        ope="/";
        screen.textContent="";
    }
}

function enterNum(){
    n0.onclick=()=>screen.textContent=screen.textContent+n0.textContent;
    n1.onclick=()=>screen.textContent=screen.textContent+n1.textContent;
    n2.onclick=()=>screen.textContent=screen.textContent+n2.textContent;
    n3.onclick=()=>screen.textContent=screen.textContent+n3.textContent;
    n4.onclick=()=>screen.textContent=screen.textContent+n4.textContent;
    n5.onclick=()=>screen.textContent=screen.textContent+n5.textContent;
    n6.onclick=()=>screen.textContent=screen.textContent+n6.textContent;
    n7.onclick=()=>screen.textContent=screen.textContent+n7.textContent;
    n8.onclick=()=>screen.textContent=screen.textContent+n8.textContent;
    n9.onclick=()=>screen.textContent=screen.textContent+n9.textContent;
}