var register=document.querySelector(".register");
var login=document.querySelector(".login");
var startRegister=document.querySelector(".start__register");
var startLogin=document.querySelector(".start__login");
var start=document.querySelector(".start");
var correctRegistration=document.querySelector(".correctRegistration");
var loginBack=document.querySelector(".loginBack");
var registerName=document.querySelector(".register__name");
var registerSurname=document.querySelector(".register__surname");
var registerEmail=document.querySelector(".register__email");
var registerPw=document.querySelector(".register__pw");
var loginEmail=document.querySelector(".login__email");
var loginPw=document.querySelector(".login__pw");

var registerButton=document.querySelector(".register__button");
var registerbackButton=document.querySelector(".register__backButton");
var loginbackButton=document.querySelector(".login__backButton");
var loginButton=document.querySelector(".login-button");

var credentialError=document.querySelector(".credentialError");

//usar curray con find, validar, añadir feedback panel



var allUsers=[];


showRegister=function(){
    register.classList.add("display");
    register.classList.remove("hide");
    start.classList.add("hide");

}
showLogin=function(){
    login.classList.add("display");
    login.classList.remove("hide");
    start.classList.add("hide");
    
}
showLogin2=function(event){
    login.classList.add("display");
    login.classList.remove("hide");
    correctRegistration.classList.add("hide");
    correctRegistration.classList.remove("display");
    event.preventDefault(); 
}

function newUser(name,surname,email,password){
    this.name=name;
    this.surname=surname;
    this.email=email;
    this.password=password;
}

getData=function(event){
    if(registerName.value=="" || registerSurname.value=="" || registerEmail.value=="" || registerPw.value=="" ){
        alert("please enter valid data");
    }else{
        var nextUser=new newUser(registerName.value,registerSurname.value, registerEmail.value, registerPw.value);
        console.log(nextUser);
        allUsers.push(nextUser);
        correctRegistration.classList.add("display");
        correctRegistration.classList.remove("hide");
        register.classList.add("hide");
        register.classList.remove("display");
    }
    event.preventDefault();
}
getBack=function(){
    register.classList.add("hide");
    register.classList.remove("display");
    start.classList.add("display");
    start.classList.remove("hide");
}
getBack2=function(){
    login.classList.add("hide");
    login.classList.remove("display");
    start.classList.add("displayloginBack");
    start.classList.remove("hide");
}

checkUsers=function(){
    var found=false;
     for(var i=0;i<allUsers.length;i++){
        if(loginEmail.value==allUsers[i].email && loginPw.value==allUsers[i].password){
            found=true;
        }
    } 
    if(found==false){
        credentialError.innerHTML="Credentials error"
    }else{
        alert("WELCOME");
    }
}



startRegister.addEventListener("click",showRegister);
startLogin.addEventListener("click",showLogin);
registerButton.addEventListener("click",getData);
registerbackButton.addEventListener("click",getBack);
loginbackButton.addEventListener("click",getBack2);
loginButton.addEventListener("click",checkUsers);
loginBack.addEventListener("click",showLogin2);