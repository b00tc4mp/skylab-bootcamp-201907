const {validate} = require('footcamp-utils')
const { models: { User,  League, Team, Player } } = require('footcamp-data')

 /**
 * creates a team by name within the league and linked to the user id
 * @param {*} id 
 * @param {*} code 
 * @param {*} name 
 * @param {*} points 
 *  
 * @returns {Promise}
*/

module.exports = function(id, code, name, points) {
   
    validate.string(id, 'id')
    validate.string(code, 'code')
    validate.string(name, 'name')
    validate.number(points, 'points')
   
    return (async () => {

                
        const user = await User.findById(id)

        if (!user) throw new Error(`User with id ${id} does not exist`)

        const league = await League.findOne({ code })

        if (!league) throw Error(`League with code ${ code } does not exist`)

        const findTeam = await Team.findOne({ name })

        if (findTeam) throw Error(`Team with name ${ name } already exist`)

        const team = new Team({name,points})

        //associate the owner of the team to this team
        team.owner = id

        //add team to the array in the league
        league.team.push(team)

        let players = await Player.find({}).lean()
        //get all the players in the team
        // let playersArray = await Promise.all(players.map((player) =>
        //     Player.findOne({ _id : idPlayer})
        //  ))
debugger
        let goalkeeper = [] , defender =[], midfielder=[], striker = []
        //select all the players by position and splice 1 goalkeeper, 4 defenders, 4 midfielders, 2 strikers
        let goalkeepers = players.filter(player => player.position === 1).splice(0,20) 

        let defenders = players.filter(player => player.position === 2).splice(0,100)
        let midfielders = players.filter(player => player.position === 3).splice(0,100)
        let strikers = players.filter(player => player.position === 4).splice(0,100)

        for (let i=0; i<2; i++){

            goalkeeper.push(goalkeepers[Math.floor(Math.random() * goalkeepers.length)])
        }
        for (let i=0; i<6; i++){
            defender.push(defenders[Math.floor(Math.random() * defenders.length)])
        }
        for (let i=0; i<6; i++){
             midfielder.push(midfielders[Math.floor(Math.random() * midfielders.length)])
        }
        for (let i=0; i<4; i++){
             striker.push(strikers[Math.floor(Math.random() * strikers.length)])

        }

        



        let initialTeam=[...goalkeeper, ...defender, ...midfielder, ...striker]
 
         team.save()
 
         return initialTeam

        
        // //check if the players belongs to others teams in the league
        // let teamsLeague= []
        // //save the players of the league in this array for the future condition
        // let playersLeague= []
        
        // league.team.forEach(teams => {
        //     teamsLeague.push(teams)
        // })

        // teamsLeague.forEach(teamplayers => {
        //     playersLeague.push(teamplayers.players)  
        // })
    

       
        // //generate 18 random players for the team
        // let players
        
     
        // let playersUsed = []
        // let playersSelectedGoalKeeper = []
        // let playersSelectedDefender = []
        // let playersSelectedMidfielder = []
        // let playersSelectedStriker = []
        


        
        // //loop to extract one player at time

        // for (let i= 0; playersUsed.length<18; i++ ){
           
        //     //extract one player from the database
        //    players = await Player.aggregate([{ $sample: { size: 1 } }])
          
            
        //     //condition to check if the player was selected before for the agrregate method
        //     if (!(playersUsed.includes(players[0]._id.toString())) && (!(playersLeague.includes(players[0]._id.toString()))) ){
                    
                
        //         const rules = [
        //             {position: 1, max: 2},
        //             {position: 2, max: 6},
        //             {position: 3, max: 6},
        //             {position: 4, max: 4}
        //         ]
                
        //         const match = rules.find(rule => players[0].position === rule.position)

              
        //         if (match.position===1 && playersSelectedGoalKeeper.length < match.max){
        //             playersSelectedGoalKeeper.push(players[0]._id.toString())
        //             playersUsed.push(players[0]._id.toString())
        //             // team.players.push(players[0]._id.toString())
                
        //         }
        //         else if (match.position===2 && playersSelectedDefender.length < match.max){
        //             playersSelectedDefender.push(players[0]._id.toString())
        //             playersUsed.push(players[0]._id.toString())
        //             // team.players.push(players[0]._id.toString())
                    
        //         }
        //         else if (match.position===3 && playersSelectedMidfielder.length < match.max){
        //             playersSelectedMidfielder.push(players[0]._id.toString())
        //             playersUsed.push(players[0]._id.toString())
        //             // team.players.push(players[0]._id.toString())
        //         }

        //         else if (match.position===4 && playersSelectedStriker.length < match.max){
        //             playersSelectedStriker.push(players[0]._id.toString())
        //             playersUsed.push(players[0]._id.toString())
        //             // team.players.push(players[0]._id.toString())
        //         }
                
        //         //assign the array with 18 players to the property players of the created team
        //         team.players=playersUsed
        //  } 

        // }      

        // await league.save()
        // await team.save()
          

    })()
}
