// users curray
var users = new Curray();

//panels
var panels = document.getElementsByClassName("panel");


// initial panel

var initial = new Initial(panels[0]);

initial.onNavigateToRegister(function (event) {
    initial.hide();
    register.show();
});

initial.onNavigateToLogin(function (event) {
    initial.hide();
    login.show();
});


// register panel

var register = new Register(panels[1]);
var feedback = new Feedback(panels[1].children[2]);

register.onNavigateBack(function (event) {
    register.resetInputs();

    register.hide();
    feedback.hide();
    initial.show();
});

register.onRegisterSubmit(function (name , surname , email , password) {
    try {
        register(name, surname, email, password);

        register.resetInputs();
        
        register.hide();
        registerSuccess.show();
    } catch (error) {
        register.showFeedback(error.message);
    }
});

// Register Success
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
var searchForm = new SearchPanel(panels[5].children[1]);

searchForm.onSearchSubmit(function(query){  
    var items = getItems(query);
    galleryPanel.showItems(items);  
    
});

//galleryPanel
var galleryPanel = new GalleryPanel(document.getElementsByClassName('gallery')[0]);




    




