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


initialPanel.onNavigateToRegister(function(){

    initialPanel.hide();
    registerPanel.show();
   
  
});

initialPanel.onNavigateToLogin(function(){
    
    initialPanel.hide();
    loginPanel.show();
});



//panel register
var registerPanel = new RegisterPanel(panels[1]);



//back link register panel

registerPanel.onNavigateBack(function(event){
    resetInputs(); 

    registerPanel.hide();
    initialPanel.show();
});

//Form registration
registerPanel.onSubmitRegister(function(name, surname, email, password){
    try {
        register(name, surname, email, password);

        registerPanel.hide();
        registerSuccessPanel.show();

    } 
    catch (error) {

        //gestión errores formulario aparece error en parágrafo
        registerPanel.showFeedback(error.message);
    }
});


var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);


registerSuccessPanel.onNavigateToLogin(function(event){
    event.preventDefault();
    resetInputs();

    
    registerSuccessPanel.hide();
    loginPanel.show();
});


//login panel

var loginPanel = new LoginPanel(panels[3]);

loginPanel.onNavigateBack(function(){
    resetInputs();

    loginPanel.hide();
    initialPanel.show();
});



loginPanel.onSubmitLogin(function(email, password){
    
    try{
        login(email, password);

        loginPanel.hide();
        welcomePanel.show();
        searchPanel.show();

    } catch (error){
        loginPanel.showFeedback(error.message);
    }

});



var welcomePanel =  new WelcomePanel(panels[4]);


welcomePanel.onClickLogout(function(){
    resetInputs(); 
   
    welcomePanel.hide();
    initialPanel.show();
    searchPanel.hide();
   

});



var searchPanel = new SearchPanel(panels[5]);


var products = new ShowProducts(panels[6]);

searchPanel.onSubmitSearch(function(query){

    var results= searchApi(query); 
    products.showProducts(results);
});


