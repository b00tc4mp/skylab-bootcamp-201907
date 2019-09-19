module.exports = {
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    retrieveUserAd: require('./retrieve-user-ad'),
    toggleUserFav: require("./toggle-user-fav"),
    retrieveFav: require("./retrieve-fav"),
    

    registerAd: require('./register-ad'),
    retrieveAllAd: require('./retrieve-all-ad'), 
    retrieveAd: require('./retrieve-ad'),
    deleteAd: require('./delete-ad'),
    searchAd: require('./search-ad'), 
   
    
    //retrieveAllAd: require('./retrieve-all-ad'),
  
    
    sendMessage: require("./send-message"),
    responseEmail: require("./response-email"),
    retrieveUserMessage: require("./retrieve-user-message"),
    unreadMessage: require("./unread_message"),
    

    uploadImage: require("./upload-image"),


    // updateUser: require('./update-user'),
    // unregisterUser: require('./unregister-user'),
    // registerCard: require('./register-card'),
    // registerVehicle: require('./register-vehicle'),
    // registerProperty: require('./register-property')
}