import registerUser from './register-user'
import authenticateUser from './authenticate-user'
import isUserLoggedIn from './is-user-logged-in'
import logUserOut from './log-user-out'
import retrieveUser from './retrieve-user'
import listApproved from './list-polls-for-user'
import listAll from './all-city'
import newPoll from './new-poll'
import allApproved from './all-approved'
import listExpired from './all-expired'
import listPending from './all-pending'
import listRejected from './all-rejected'
import changeStatus from './change-status'
import singlePoll from './single-poll'
import votePoll from './vote-poll'
import editPoll from './edit-poll'

export default {
    set __token__(token) {
        sessionStorage.token = token
    },

    get __token__() {
        return sessionStorage.token
    },

    registerUser,
    listApproved,
    listAll,
    allApproved,
    listExpired,
    listPending,
    listRejected,
    authenticateUser,
    isUserLoggedIn,
    logUserOut,
    retrieveUser,
    singlePoll,
    newPoll,
    changeStatus,
    votePoll,
    editPoll
}