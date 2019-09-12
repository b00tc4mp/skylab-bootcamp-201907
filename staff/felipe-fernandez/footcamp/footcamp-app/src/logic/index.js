import registerUser from './register-user'
import isUserLogged from './is-user-logged'
import authenticateUser from './authenticate-user'
import retrieveUser from './retrieve-user'
import createLeague from './league-create'
import joinLeague from './league-join'
import createTeam from './team-create'
import retrievePlayer from './player-retrieve'
import retrieveTeam from './retrieve-team'
import getLineup from './get-lineup'
import retrieveLineup from './retrieve-lineup'
import retrieveAllLeagues from './retrieve-leagues'
import retrieveLeague from './retrieve-league'
import retrieveTable from './retrieve-table'


export default {

    set userCredentials(token){
        sessionStorage.token = token
       
    },
    get userCredentials(){
        return sessionStorage.token
    },
    registerUser,
    authenticateUser,
    isUserLogged,
    retrieveUser,
    createLeague, 
    joinLeague,
    createTeam,
    retrievePlayer,
    retrieveTeam,
    getLineup,
    retrieveLineup,
    retrieveAllLeagues,
    retrieveLeague,
    retrieveTable

}