// users curray
var users = new Curray();

//panels
var panels = document.getElementsByClassName("panel");


// initial panel

var initialPanel = new InitialPanel(panels[0]);

initialPanel.onNavigateToRegister(function (event) {
    initialPanel.hide();
    registerPanel.show();
});

initialPanel.onNavigateToLogin(function (event) {
    initialPanel.hide();
    loginPanel.show();
});


// register panel

var registerPanel = new RegisterPanel(panels[1]);
var feedbackRegisterPanel = new FeedbackPanel(panels[1].children[2]);

registerPanel.onNavigateBack(function (event) {
    registerPanel.resetInputs();

    registerPanel.hide();
    feedbackRegisterPanel.hide();
    initialPanel.show();
});

registerPanel.onRegisterSubmit(function (name , surname , email , password) {
    try {
        register(name, surname, email, password);

        registerPanel.resetInputs();
        
        registerPanel.hide();
        registerSuccessPanel.show();
    } catch (error) {
        registerPanel.showFeedback(error.message);
    }
});

// successRegisterPanel
var registerSuccessPanel = new RegisterSuccessPanel(panels[2]);

registerSuccessPanel.onNavigateToInit(function(event){
    registerSuccessPanel.hide();
    initialPanel.show();
});

registerSuccessPanel.onNavigateToLogin(function(event){
    registerSuccessPanel.hide();
    loginPanel.show();
});


// loginPanel
var loginPanel = new LoginPanel(panels[3]);
var feedbackLoginPanel = new FeedbackPanel(panels[3].children[2]);

loginPanel.onNavigateBack(function(event){
    loginPanel.resetInputs();

     loginPanel.hide();
     feedbackLoginPanel.hide();
     initialPanel.show();
});

loginPanel.onSuccessLogin(function(event){
    event.preventDefault();

    var mail = event.target.logMail.value;
    var password = event.target.logPassword.value;
    
    try{
        login(mail , password);

        loginPanel.resetInputs();
        
        loginPanel.hide();
        feedbackLoginPanel.hide();
        homePanel.show();

    } catch(error){
        loginPanel.showFeedback(error.message);
    }
});


//homePanel
var homePanel = new HomePanel(panels[4]);
homePanel.onClickLogout(function(event){
    homePanel.hide();
    initialPanel.show();
});

//searchPanel
var searchForm = new SearchPanel(panels[5].children[0]);

searchForm.onSearchSubmit(function(query){  
    var items = getItems(query);
    galleryPanel.showItems(items);  
    
});

//galleryPanel
var galleryPanel = new GalleryPanel(panels[5].children[0]);




    




