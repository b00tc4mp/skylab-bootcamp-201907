
var usuario={email:"",cons:"", name:"", surname:""}
//Page divs
var inicio=document.getElementById('ini');
var login=document.getElementById('log');
var regis=document.getElementById('reg');
var check=document.getElementById('ok');
var into=document.getElementById('wel')
//buttons
var bRegis=document.getElementById('register')
var bLog=document.getElementById('login');
var bConfirm=document.getElementById('confirm')
var bNext=document.getElementById('next');
//input
var user=document.getElementById('user');
var pass=document.getElementById('key')

    login.style.display='none';
    into.style.display='none';
    check.style.display='none';
    regis.style.display='none';

bRegis.addEventListener('click', function (){
    inicio.style.display='none';
    login.style.display='none';
    into.style.display='none';
    check.style.display='none';
    regis.style.display='block';
})
bLog.addEventListener('click', function (){
    inicio.style.display='none';
    regis.style.display='none';
    into.style.display='none';
    check.style.display='none';
    login.style.display='block';
})
bConfirm.addEventListener('click', function (){
    usuario.email=user.value;
    usuario.cons=pass.value;
    login.style.display='none';
    check.style.display='block';
})