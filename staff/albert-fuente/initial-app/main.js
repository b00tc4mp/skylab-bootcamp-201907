var register = document.querySelector(".register");
var login = document.querySelector(".login");
var startRegister = document.querySelector(".start__register");
var startLogin = document.querySelector(".start__login");
var start = document.querySelector(".start");
var correctRegistration = document.querySelector(".correctRegistration");
var loginBack = document.querySelector(".loginBack");

var loginEmail = document.querySelector(".login__email");
var loginPw = document.querySelector(".login__pw");

var registerButton = document.querySelector(".register__button");
var registerbackButton = document.querySelector(".register__backButton");
var loginbackButton = document.querySelector(".login__backButton");
var loginButton = document.querySelector(".login-button");

var credentialError = document.querySelector(".credentialError");
var credentialError2 = document.querySelector(".credentialError2");

var registerName = document.querySelector(".register__name").value;
var registerSurname = document.querySelector(".register__surname").value;
var registerEmail = document.querySelector(".register__email").value;
var registerPw = document.querySelector(".register__pw").value;




/* var allUsers = new Curray(1,2);
 */
/**DATA LAYER */
/**BUSINESS DATA */
/**PRESENTATION */


/********************************************* */





showRegister = function () {
    register.classList.add("display");
    register.classList.remove("hide");
    start.classList.add("hide");

}
showLogin = function () {
    login.classList.add("display");
    login.classList.remove("hide");
    start.classList.add("hide");

}
showLogin2 = function (event) {
    login.classList.add("display");
    login.classList.remove("hide");
    correctRegistration.classList.add("hide");
    correctRegistration.classList.remove("display");
    event.preventDefault();
}

function newUser(name, surname, email, password) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
}

getData = function (event) {
/*     if (!registerName.value.trim().length){
        credentialError.innerHTML = "Name cannot be empty";
    }else if(!registerSurname.value.trim().length){
        credentialError.innerHTML = "Surname cannot be empty";
    }else if(!registerEmail.value.trim().length){
        credentialError.innerHTML = "Email cannot be empty";
    }else if(!registerPw.value.trim().length) {
        credentialError.innerHTML = "Password cannot be empty";
    } else {
        var found = allUsers.findTest(function (user) {
            return user.email == registerEmail.value && user.password == registerPw.value;
        });
        if (found) {
            credentialError.innerHTML = "Credentials error";
        } else {
            var nextUser = new newUser(registerName.value, registerSurname.value, registerEmail.value, registerPw.value);
            console.log(nextUser);
            allUsers.pushTest(nextUser);
            correctRegistration.classList.add("display");
            correctRegistration.classList.remove("hide");
            register.classList.add("hide");
            register.classList.remove("display");
        }

    
    }
    event.preventDefault(); */
    event.preventDefault();


    
    try{
        registration(registerName,registerSurname,registerEmail,registerPw);
        correctRegistration.classList.add("display");
        correctRegistration.classList.remove("hide");
        register.classList.add("hide");
        register.classList.remove("display");
    }catch(error){
        console.log(error);
        credentialError.innerText=error

    }


/*     try{
        register(name,surname,email,password)
    }catch(error){
        var ...
    } */


}
getBack = function () {
    register.classList.add("hide");
    register.classList.remove("display");
    start.classList.add("display");
    start.classList.remove("hide");
}
getBack2 = function () {
    login.classList.add("hide");
    login.classList.remove("display");
    start.classList.add("displayloginBack");
    start.classList.remove("hide");
}

checkUsers = function () {

    var found = allUsers.findTest(function (user) {
        return user.email == loginEmail.value && user.password == loginPw.value;
    });
    if (!found) {
        credentialError2.innerHTML = "Credentials error"
        console.log("CREDENTIAL ERROR")
    } else {
        alert("WELCOME");
    }
}


startRegister.addEventListener("click", showRegister);
startLogin.addEventListener("click", showLogin);
registerButton.addEventListener("click", getData);
registerbackButton.addEventListener("click", getBack);
loginbackButton.addEventListener("click", getBack2);
loginButton.addEventListener("click", checkUsers);
loginBack.addEventListener("click", showLogin2);


