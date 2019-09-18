module.exports = {
    registerUser: require('./user/register-user'),
    authenticateUser: require('./user/authenticate-user'),
    retrieveUser: require('./user/retrieve-user'),
    updateUser: require('./user/update-user'),
    unregisterUser: require('./user/unregister-user'),
    toggleBookmark: require('./user/toggle-bookmark'),
    
    createPost: require('./post/create-post'),
    retrievePost: require('./post/retrieve-post'),
    retrieveAllPosts: require('./post/retrieve-all-posts'),
    retrieveUserPosts: require('./post/retrieve-user-posts'),
    deletePost: require('./post/delete-post'),
    votePost: require('./post/vote-post'),
    retrieveRanking: require('./post/retrieve-ranking'),

    addComment: require('./comment/add-comment'),
    retrievePostComments: require('./comment/retrieve-post-comments'),
    deleteComment: require('./comment/delete-comment')
}