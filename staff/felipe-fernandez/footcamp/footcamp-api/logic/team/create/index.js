const {validate} = require('footcamp-utils')
const { models: { User,  League, Team, Player } } = require('footcamp-data')

 /**
 * Creates a team by name within the league and linked to the user 
 *
 * @param {*} id 
 * @param {*} leagueId 
 * @param {*} name 
 * 
 *  
 * @returns {Promise}
*/

module.exports = function(id, name, leagueId) {
   
    validate.string(id, 'id')
    validate.string(leagueId, 'leagueId')
    validate.string(name, 'name')
   
    return (async () => {
   
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ _id: leagueId })

        if (!league) throw Error(`League with leagueId ${ leagueId } does not exist`)

        const findTeam = await Team.findOne({ name })

        if (findTeam) throw Error(`Team with name ${ name } already exist`)
        
        //if the user is not in the league is not possible to  create a team
        if (!(league.participants.includes(user.id))) throw Error(`You haven't joined the league with code ${code} yet`)

            
        const team = new Team({name})
    
        //associate the owner of the team to this team
        team.owner = id

        //select all the players of the database
        const players = await Player.find({}).lean()
        
        let goalkeeper = [] , defender =[], midfielder=[], striker = []

        //select all the players by position and splice 1 goalkeeper, 4 defenders, 4 midfielders, 2 strikers

        //filter all the players by position
        const goalkeepers = players.filter(player => player.position === 1).splice(0,58) 
        const defenders = players.filter(player => player.position === 2).splice(0,150)
        const midfielders = players.filter(player => player.position === 3).splice(0,150)
        const strikers = players.filter(player => player.position === 4).splice(0,100)

        let match, keeper
           
        for (let i=0; i<2; i++){
            
            do {
                keeper = goalkeepers[Math.floor(Math.random() * goalkeepers.length)]
                match = league.playersUsed.find(player => player.name === keeper.name)
            } while(match)
                goalkeeper.push(keeper)
                
                league.playersUsed.push(keeper)
                match = false
        }
        
        let match2, def

        for (let i=0; i<6; i++){
            do {
                def = defenders[Math.floor(Math.random() * defenders.length)]
                match2 = league.playersUsed.find(player => player.name === def.name)
            }while(match2)
                defender.push(def)
                league.playersUsed.push(def)
                match2 = false

        }

        let match3,mid

        for (let i=0; i<6; i++){
            do {
              
              mid = midfielders[Math.floor(Math.random() * midfielders.length)]
              match3 = league.playersUsed.find(player => player.name === mid.name)
            }while(match3)
                midfielder.push(mid)
                league.playersUsed.push(mid)
                match3 = false
        }

         let match4, strike
         for (let i=0; i<4; i++){
            do {
                 strike = strikers[Math.floor(Math.random() * strikers.length)]
                 match4 = league.playersUsed.find(player => player.name === strike.name)
            }while(match4)
                striker.push(strike)
                league.playersUsed.push(strike)
                match4 = false

        }

        //extract the id of the players
        let idsGoalkeeper = [], idsDefender=[], idsMidfielder=[], idsStriker= []
        idsGoalkeeper = goalkeeper.map((player)=>  player._id.toString())
        idsDefender = defender.map((player)=>  player._id.toString() )
        idsMidfielder = midfielder.map((player)=>  player._id.toString())
        idsStriker = striker.map((player)=> player._id.toString())

        //put the ids into an array
       let initialTeam=[...idsGoalkeeper, ...idsDefender, ...idsMidfielder, ...idsStriker]

        //insert all the ids in the array of players of the team 
        initialTeam.forEach((element) => {
            team.players.push(element)
        })
        
      

        //add team to the array in the league
    
        
        teamId = team.id
        league.team.push(team)
        delete team._id
       
        await team.save()
        await league.save()

        let teamCreated = {
            id: teamId,
            players: initialTeam,
    
        }
        return teamCreated
        
   

    })()
}
