module.exports = {
    registerUser: require('./user/register'),
    authenticateUser: require('./user/authenticate'),
    updateUser: require('./user/update'),
    retrieveUser: require('./user/retrieve'),
    newPoll: require('./poll/new-poll'),
    updatePoll: require('./poll/update-poll'),
    listAll: require('./poll/list-all'),
    listApproved: require('./poll/list-approved'),
    listRejected: require('./poll/list-expired'),
    listExpired: require('./poll/list-pending'),
    listPending: require('./poll/list-rejected'),
    votePoll: require('./poll/vote-poll')
}