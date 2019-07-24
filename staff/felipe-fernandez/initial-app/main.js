'use strict';

/**
 * Presentation
 */



var panels = document.getElementsByClassName('panel');


function resetInputs(){
    var inputs= document.getElementsByTagName('input');
    for (var i=0; i<inputs.length; i++){
        inputs[i].value='';
    }
}

//initial name

var initialPanel = new InitialPanel(panels[0]);


initialPanel.onNavigateToRegister(function(event){

    event.preventDefault();
    initialPanel.hide();
    registerPanel.show();
   
  
});

initialPanel.onNavigateToLogin(function(event){
    event.preventDefault();

    initialPanel.hide();
    loginPanel.show();
});



//panel register
var registerPanel = new RegisterPanel(panels[1]);



//back link register panel

registerPanel.onNavigateBack(function(event){
    event.preventDefault();

    resetInputs(); 

    feedbackPanel.hide();
    registerPanel.hide();
    initialPanel.show();
});

//Form registration
registerPanel.onSubmitRegister(function(event){

    event.preventDefault();

    var name = event.target.name.value;
    var surname = event.target.surname.value;
    var email = event.target.email.value;
    var password = event.target.password.value;


    //catch errors throwed in logic part for the validation in the form registration
    try {
        register(name, surname, email, password);

       
        registerPanel.hide();
        registerSuccessPanel.show();

    } 
    catch (error) {

        //gestión errores formulario aparece error en parágrafo

        /* var registerFeedback = registerPanel.container.children[1];
        
        registerFeedback.innerText = error.message; */
        feedbackPanel.show();
        feedbackPanel.showError(error.message);

    }

});


var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);


registerSuccessPanel.onNavigateToLogin(function(event){
    event.preventDefault();
    resetInputs();

    
    registerSuccessPanel.hide();
    loginPanel.show();
});



var loginPanel = new LoginPanel(panels[3]);

loginPanel.onNavigateBack(function(event){
    event.preventDefault();
    resetInputs();

    feedbackPanel.hide();
    loginPanel.hide();
    initialPanel.show();
});



loginPanel.onSubmitLogin(function(event){
    event.preventDefault();

    var email = event.target.email.value;
    var password = event.target.password.value;

   /*  
    var loginOk = users.find(function(element){
        return (email===element.email && password===element.password)

    }); */

    try{
        login(email, password);

        loginPanel.hide();
        welcomePanel.show();

    } catch (error){
       /*  var loginFeedback = loginPanel.container.children[1];
        
        loginFeedback.innerText = error.message; */
        
        feedbackPanel.show();
        feedbackPanel.showError(error.message);
    }

});



var welcomePanel =  new WelcomePanel(panels[4]);


welcomePanel.onClickLogout(function(event){
    event.preventDefault();
    resetInputs(); 
    
    welcomePanel.hide();
    initialPanel.show();

});



var feedbackPanel = new FeedbackPanel(panels[5]);


