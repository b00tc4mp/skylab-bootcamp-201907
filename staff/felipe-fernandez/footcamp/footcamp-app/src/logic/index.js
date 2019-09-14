import registerUser from './register-user'
import isUserLogIn from './is-user-log-in'
import logUserOut from './is-user-log-out'
import authenticateUser from './authenticate-user'
import retrieveUser from './retrieve-user'
import createLeague from './league-create'
import joinLeague from './league-join'
import createTeam from './team-create'
import retrievePlayer from './player-retrieve'
import retrieveTeam from './retrieve-team'
import deleteTeam from './delete-team'
import updateTeam from './update-team'
import getLineup from './get-lineup'
import retrieveLineup from './retrieve-lineup'
import retrieveAllLeagues from './retrieve-leagues'
import retrieveLeague from './retrieve-league'
import leaveLeague from './leave-league'
import retrieveTable from './retrieve-table'


export default {

    set __token__(token){
        sessionStorage.token = token
       
    },
    get __token__(){
        return sessionStorage.token
    },
    registerUser,
    authenticateUser,
    isUserLogIn,
    logUserOut,
    retrieveUser,
    createLeague, 
    joinLeague,
    createTeam,
    deleteTeam,
    retrievePlayer,
    retrieveTeam,
    updateTeam,
    getLineup,
    retrieveLineup,
    retrieveAllLeagues,
    retrieveLeague,
    leaveLeague,
    retrieveTable

}