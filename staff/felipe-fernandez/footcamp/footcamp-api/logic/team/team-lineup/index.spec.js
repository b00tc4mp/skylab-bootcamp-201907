require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve lineup', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code
    let namePlayer, surnamePlayer, player_id, real_team, position, points_per_game,  total_points,  yellow_cards,  red_cards,  goals,  minutes,  cost
    // let namePlayer2, surnamePlayer2, player_id2, real_team2, position2, points_per_game2,  total_points2,  yellow_cards2,  red_cards2,  goals2,  minutes2,  cost2
    // let namePlayer3, surnamePlayer3, player_id3, real_team3, position3, points_per_game3,  total_points3,  yellow_cards3,  red_cards3,  goals3,  minutes3,  cost3
    // let namePlayer4, surnamePlayer4, player_id4, real_team4, position4, points_per_game4,  total_points4,  yellow_cards4,  red_cards4,  goals4,  minutes4,  cost4
    // let namePlayer5, surnamePlayer5, player_id5, real_team5, position5, points_per_game5,  total_points5,  yellow_cards5,  red_cards5,  goals5,  minutes5,  cost5
    // let namePlayer6, surnamePlayer6, player_id6, real_team6, position6, points_per_game6,  total_points6,  yellow_cards6,  red_cards6,  goals6,  minutes6,  cost6
    // let namePlayer7, surnamePlayer7, player_id7, real_team7, position7, points_per_game7,  total_points7,  yellow_cards7,  red_cards7,  goals7,  minutes7,  cost7
    // let namePlayer8, surnamePlayer8, player_id8, real_team8, position8, points_per_game8,  total_points8,  yellow_cards8,  red_cards8,  goals8,  minutes8,  cost8
    // let namePlayer9, surnamePlayer9, player_id9, real_team9, position9, points_per_game9,  total_points9,  yellow_cards9,  red_cards9,  goals9,  minutes9,  cost9
    // let namePlayer10, surnamePlayer10, player_id10, real_team10, position10, points_per_game10,  total_points10,  yellow_cards10,  red_cards10,  goals10,  minutes10,  cost10
    // let namePlayer11, surnamePlayer11, player_id11, real_team11, position11, points_per_game11,  total_points11,  yellow_cards11,  red_cards11,  goals11,  minutes11,  cost11
    // let namePlayer12, surnamePlayer12, player_id12, real_team12, position12, points_per_game12,  total_points12,  yellow_cards12,  red_cards12,  goals12,  minutes12,  cost12
    // let namePlayer13, surnamePlayer13, player_id13, real_team13, position13, points_per_game13,  total_points13,  yellow_cards13,  red_cards13,  goals13,  minutes13,  cost13
    // let namePlayer14, surnamePlayer14, player_id14, real_team14, position14, points_per_game14,  total_points14,  yellow_cards14,  red_cards14,  goals14,  minutes14,  cost14  
    // let namePlayer15, surnamePlayer15, player_id15, real_team15, position15, points_per_game15,  total_points15,  yellow_cards15,  red_cards15,  goals15,  minutes15,  cost15
    // let namePlayer16, surnamePlayer16, player_id16, real_team16, position16, points_per_game16,  total_points16,  yellow_cards16,  red_cards16,  goals16,  minutes16,  cost16
    // let namePlayer17, surnamePlayer17, player_id17, real_team17, position17, points_per_game17,  total_points17,  yellow_cards17,  red_cards17,  goals17,  minutes17,  cost17
    // let namePlayer18, surnamePlayer18, player_id18, real_team18, position18, points_per_game18,  total_points18,  yellow_cards18,  red_cards18,  goals18,  minutes18,  cost18
    // let id_player ,id_player2, id_player3, id_player4,  id_player5 ,  id_player6 , id_player7, id_player8,  id_player9 , id_player10, id_player11, id_player12, id_player13, id_player14, id_player15, id_player16, id_player17, id_player18 




    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`
        points= 0
    //    //create player 1
    //    namePlayer = `name-${Math.random()}`
    //    surnamePlayer = `surname-${Math.random()}`
    //    player_id = number(1111,2241111)
    //    real_team = `realTeam-${Math.random()}`
    //    position = 1
    //    points_per_game = number(1111,2241111)
    //    total_points = number(1111,2241111)
    //    yellow_cards = number(1111,2241111)
    //    red_cards = number(1111,2241111)
    //    goals = number(1111,2241111)
    //    minutes = number(1111,2241111)
    //    cost = number(1111,2241111)
    //    //create player 2
    //    namePlayer2 = `name-${Math.random()}`
    //    surnamePlayer2 = `surname-${Math.random()}`
    //    player_id2 = number(1111,2241111)
    //    real_team2 = `realTeam-${Math.random()}`
    //    position2 = 2
    //    points_per_game2 = number(1111,2241111)
    //    total_points2 = number(1111,2241111)
    //    yellow_cards2 = number(1111,2241111)
    //    red_cards2 = number(1111,2241111)
    //    goals2 = number(1111,2241111)
    //    minutes2 = number(1111,2241111)
    //    cost2 = number(1111,2241111)


    //     //create player 3
    //     namePlayer3 = `name-${Math.random()}`
    //     surnamePlayer3 = `surname-${Math.random()}`
    //     player_id3 = number(1111,2241111)
    //     real_team3 = `realTeam-${Math.random()}`
    //     position3 = 3
    //     points_per_game3 = number(1111,2241111)
    //     total_points3 = number(1111,2241111)
    //     yellow_cards3 = number(1111,2241111)
    //     red_cards3 = number(1111,2241111)
    //     goals3 = number(1111,2241111)
    //     minutes3 = number(1111,2241111)
    //     cost3 = number(1111,2241111)
    //     //create player 4
    //     namePlayer4= `name-${Math.random()}`
    //     surnamePlayer4= `surname-${Math.random()}`
    //     player_id4 = number(1111,2241111)
    //     real_team4 = `realTeam-${Math.random()}`
    //     position4 = 4
    //     points_per_game4 = number(1111,2241111)
    //     total_points4 = number(1111,2241111)
    //     yellow_cards4 = number(1111,2241111)
    //     red_cards4 = number(1111,2241111)
    //     goals4 = number(1111,2241111)
    //     minutes4 = number(1111,2241111)
    //     cost4 = number(1111,2241111)

    //         //create player 5
    //    namePlayer5 = `name-${Math.random()}`
    //    surnamePlayer5 = `surname-${Math.random()}`
    //    player_id5 = number(1111,2241111)
    //    real_team5 = `realTeam-${Math.random()}`
    //    position5 = 1
    //    points_per_game5 = number(1111,2241111)
    //    total_points5 = number(1111,2241111)
    //    yellow_cards5 = number(1111,2241111)
    //    red_cards5 = number(1111,2241111)
    //    goals5 = number(1111,2241111)
    //    minutes5 = number(1111,2241111)
    //    cost5 = number(1111,2241111)
       

    //     //create player 6
    //    namePlayer6 = `name-${Math.random()}`
    //    surnamePlayer6 = `surname-${Math.random()}`
    //    player_id6 = number(1111,2241111)
    //    real_team6 = `realTeam-${Math.random()}`
    //    position6 = 2
    //    points_per_game6 = number(1111,2241111)
    //    total_points6 = number(1111,2241111)
    //    yellow_cards6 = number(1111,2241111)
    //    red_cards6 = number(1111,2241111)
    //    goals6 = number(1111,2241111)
    //    minutes6 = number(1111,2241111)
    //    cost6 = number(1111,2241111)

    //     //create player 7
    //     namePlayer7 = `name-${Math.random()}`
    //     surnamePlayer7 = `surname-${Math.random()}`
    //     player_id7 = number(1111,2241111)
    //     real_team7 = `realTeam-${Math.random()}`
    //     position7 = 3
    //     points_per_game7 = number(1111,2241111)
    //     total_points7 = number(1111,2241111)
    //     yellow_cards7 = number(1111,2241111)
    //     red_cards7 = number(1111,2241111)
    //     goals7 = number(1111,2241111)
    //     minutes7 = number(1111,2241111)
    //     cost7 = number(1111,2241111)
        
    //     //create player 8
    //    namePlayer8 = `name-${Math.random()}`
    //    surnamePlayer8 = `surname-${Math.random()}`
    //    player_id8 = number(1111,2241111)
    //    real_team8 = `realTeam-${Math.random()}`
    //    position8 = 4
    //    points_per_game8 = number(1111,2241111)
    //    total_points8 = number(1111,2241111)
    //    yellow_cards8 = number(1111,2241111)
    //    red_cards8 = number(1111,2241111)
    //    goals8 = number(1111,2241111)
    //    minutes8 = number(1111,2241111)
    //    cost8 = number(1111,2241111)
           
    //     //create player 9
    //     namePlayer9 = `name-${Math.random()}`
    //     surnamePlayer9 = `surname-${Math.random()}`
    //     player_id9 = number(1111,2241111)
    //     real_team9 = `realTeam-${Math.random()}`
    //     position9 = 2
    //     points_per_game9 = number(1111,2241111)
    //     total_points9 = number(1111,2241111)
    //     yellow_cards9 = number(1111,2241111)
    //     red_cards9 = number(1111,2241111)
    //     goals9 = number(1111,2241111)
    //     minutes9 = number(1111,2241111)
    //     cost9 = number(1111,2241111)
       

    // //create player 10
    //     namePlayer10 = `name-${Math.random()}`
    //     surnamePlayer10 = `surname-${Math.random()}`
    //     player_id10 = number(1111,2241111)
    //     real_team10 = `realTeam-${Math.random()}`
    //     position10 = 3
    //     points_per_game10 = number(1111,2241111)
    //     total_points10 = number(1111,2241111)
    //     yellow_cards10 = number(1111,2241111)
    //     red_cards10 = number(1111,2241111)
    //     goals10 = number(1111,2241111)
    //     minutes10 = number(1111,2241111)
    //     cost10 = number(1111,2241111)
            
    //     //create player 11
    //     namePlayer11 = `name-${Math.random()}`
    //     surnamePlayer11 = `surname-${Math.random()}`
    //     player_id11 = number(1111,2241111)
    //     real_team11 = `realTeam-${Math.random()}`
    //     position11 = 4
    //     points_per_game11 = number(1111,2241111)
    //     total_points11 = number(1111,2241111)
    //     yellow_cards11 = number(1111,2241111)
    //     red_cards11 = number(1111,2241111)
    //     goals11 = number(1111,2241111)
    //     minutes11 = number(1111,2241111)
    //     cost11 = number(1111,2241111)
        

    //     //create player 12
    //     namePlayer12 = `name-${Math.random()}`
    //     surnamePlayer12 = `surname-${Math.random()}`
    //     player_id12 = number(1111,2241111)
    //     real_team12 = `realTeam-${Math.random()}`
    //     position12 = 2
    //     points_per_game12 = number(1111,2241111)
    //     total_points12 = number(1111,2241111)
    //     yellow_cards12 = number(1111,2241111)
    //     red_cards12 = number(1111,2241111)
    //     goals12 = number(1111,2241111)
    //     minutes12 = number(1111,2241111)
    //     cost12 = number(1111,2241111)
        

    //     //create player 13
    //     namePlayer13 = `name-${Math.random()}`
    //     surnamePlayer13 = `surname-${Math.random()}`
    //     player_id13 = number(1111,2241111)
    //     real_team13 = `realTeam-${Math.random()}`
    //     position13 = 3
    //     points_per_game13 = number(1111,2241111)
    //     total_points13 = number(1111,2241111)
    //     yellow_cards13 = number(1111,2241111)
    //     red_cards13 = number(1111,2241111)
    //     goals13 = number(1111,2241111)
    //     minutes13 = number(1111,2241111)
    //     cost13 = number(1111,2241111)
        

    //     //create player 14
    //     namePlayer14 = `name-${Math.random()}`
    //     surnamePlayer14 = `surname-${Math.random()}`
    //     player_id14 = number(1111,2241111)
    //     real_team14 = `realTeam-${Math.random()}`
    //     position14= 4
    //     points_per_game14 = number(1111,2241111)
    //     total_points14 = number(1111,2241111)
    //     yellow_cards14 = number(1111,2241111)
    //     red_cards14 = number(1111,2241111)
    //     goals14 = number(1111,2241111)
    //     minutes14 = number(1111,2241111)
    //     cost14 = number(1111,2241111)
        

    //     //create player 15
    //     namePlayer15 = `name-${Math.random()}`
    //     surnamePlayer15 = `surname-${Math.random()}`
    //     player_id15 = number(1111,2241111)
    //     real_team15 = `realTeam-${Math.random()}`
    //     position15 = 4
    //     points_per_game15 = number(1111,2241111)
    //     total_points15 = number(1111,2241111)
    //     yellow_cards15 = number(1111,2241111)
    //     red_cards15 = number(1111,2241111)
    //     goals15 = number(1111,2241111)
    //     minutes15 = number(1111,2241111)
    //     cost15 = number(1111,2241111)
        

    //     //create player 16
    //     namePlayer16 = `name-${Math.random()}`
    //     surnamePlayer16 = `surname-${Math.random()}`
    //     player_id16 = number(1111,2241111)
    //     real_team16 = `realTeam-${Math.random()}`
    //     position16 = 3
    //     points_per_game16 = number(1111,2241111)
    //     total_points16 = number(1111,2241111)
    //     yellow_cards16 = number(1111,2241111)
    //     red_cards16 = number(1111,2241111)
    //     goals16 = number(1111,2241111)
    //     minutes16 = number(1111,2241111)
    //     cost16 = number(1111,2241111)
        

    //     //create player 17
    //     namePlayer17 = `name-${Math.random()}`
    //     surnamePlayer17 = `surname-${Math.random()}`
    //     player_id17 = number(1111,2241111)
    //     real_team17 = `realTeam-${Math.random()}`
    //     position17 = 3
    //     points_per_game17 = number(1111,2241111)
    //     total_points17 = number(1111,2241111)
    //     yellow_cards17 = number(1111,2241111)
    //     red_cards17 = number(1111,2241111)
    //     goals17 = number(1111,2241111)
    //     minutes17 = number(1111,2241111)
    //     cost17 = number(1111,2241111)
        

    //     //create player 18
    //     namePlayer18 = `name-${Math.random()}`
    //     surnamePlayer18 = `surname-${Math.random()}`
    //     player_id18 = number(1111,2241111)
    //     real_team18 = `realTeam-${Math.random()}`
    //     position18 = 4
    //     points_per_game18 = number(1111,2241111)
    //     total_points18 = number(1111,2241111)
    //     yellow_cards18 = number(1111,2241111)
    //     red_cards18 = number(1111,2241111)
    //     goals18 = number(1111,2241111)
    //     minutes18 = number(1111,2241111)
    //     cost18 = number(1111,2241111)


        

        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            await Team.deleteMany()
            await Player.deleteMany()
            
          
            const users = await User.create({name, surname, email, password})
            id = users.id

            const league = new League({id, name: nameLeague, code})

            const team = new Team({id, name: nameTeam, points})
            team.owner = id
             
            for(let i = 0; i < 50; i++){
                let min =1
                let max= 4
                let random = Math.random()
                let randomNumber = Math.floor(random * (max -min +1)) +min
                namePlayer = `name-${Math.random()}`
                surnamePlayer = `surname-${Math.random()}`
                player_id = number(1111,2241111)
                real_team = `realTeam-${Math.random()}`
                position = randomNumber
                points_per_game = number(1111,2241111)
                total_points = number(1111,2241111)
                yellow_cards = number(1111,2241111)
                red_cards = number(1111,2241111)
                goals = number(1111,2241111)
                minutes = number(1111,2241111)
                cost = number(1111,2241111)
                const player = new Player({name: namePlayer, surname: surnamePlayer, player_id, real_team, position, points_per_game, total_points, yellow_cards, red_cards,  goals, minutes, cost  })
                team.players.push(player.id)
                await player.save()
            }
            await users.save()
            await team.save()
            await league.save()



            // const player = new Player({name: namePlayer, surname: surnamePlayer, player_id, real_team, position, points_per_game, total_points, yellow_cards, red_cards,  goals, minutes, cost  })
            // const player2 = new Player({name: namePlayer2, surname: surnamePlayer2, player_id: player_id2, real_team: real_team2 , position: position2,   points_per_game:  points_per_game2, total_points: total_points2, yellow_cards: yellow_cards2, red_cards: red_cards2,  goals: goals2, minutes: minutes2, cost: cost2  })
            // const player3 = new Player({name: namePlayer3, surname: surnamePlayer3, player_id: player_id3, real_team: real_team3 , position: position3,   points_per_game:  points_per_game3, total_points: total_points3, yellow_cards: yellow_cards3, red_cards: red_cards3,  goals: goals3, minutes: minutes2, cost: cost3  })
            // const player4 = new Player({name: namePlayer4, surname: surnamePlayer4, player_id: player_id4, real_team: real_team4 , position: position4,   points_per_game:  points_per_game4, total_points: total_points4, yellow_cards: yellow_cards4, red_cards: red_cards4,  goals: goals4, minutes: minutes4, cost: cost4  })
            // const player5 = new Player({name: namePlayer5, surname: surnamePlayer5, player_id: player_id5, real_team: real_team5 , position: position5,   points_per_game:  points_per_game5, total_points: total_points5, yellow_cards: yellow_cards5, red_cards: red_cards5,  goals: goals5, minutes: minutes5, cost: cost5  })
            // const player6 = new Player({name: namePlayer6, surname: surnamePlayer6, player_id: player_id6, real_team: real_team6 , position: position6,   points_per_game:  points_per_game6, total_points: total_points6, yellow_cards: yellow_cards6, red_cards: red_cards6,  goals: goals6, minutes: minutes6, cost: cost6  })
            // const player7 = new Player({name: namePlayer7, surname: surnamePlayer7, player_id: player_id7, real_team: real_team7 , position: position7,   points_per_game:  points_per_game7, total_points: total_points7, yellow_cards: yellow_cards7, red_cards: red_cards7,  goals: goals7, minutes: minutes7, cost: cost7  })
            // const player8 = new Player({name: namePlayer8, surname: surnamePlayer8, player_id: player_id8, real_team: real_team8 , position: position8,   points_per_game:  points_per_game8, total_points: total_points8, yellow_cards: yellow_cards8, red_cards: red_cards8,  goals: goals8, minutes: minutes8, cost: cost8  })
            // const player9 = new Player({name: namePlayer9, surname: surnamePlayer9, player_id: player_id9, real_team: real_team9 , position: position9,   points_per_game:  points_per_game9, total_points: total_points9, yellow_cards: yellow_cards9, red_cards: red_cards9,  goals: goals9, minutes: minutes9, cost: cost9  })
            // const player10 = new Player({name: namePlayer10, surname: surnamePlayer10, player_id: player_id10, real_team: real_team10 , position: position10,   points_per_game:  points_per_game10, total_points: total_points10, yellow_cards: yellow_cards10, red_cards: red_cards10,  goals: goals10, minutes: minutes10, cost: cost10  })
            // const player11 = new Player({name: namePlayer11, surname: surnamePlayer11, player_id: player_id11, real_team: real_team11 , position: position11,   points_per_game:  points_per_game11, total_points: total_points11, yellow_cards: yellow_cards11, red_cards: red_cards11,  goals: goals11, minutes: minutes11, cost: cost11  })
            // const player12 = new Player({name: namePlayer12, surname: surnamePlayer12, player_id: player_id12, real_team: real_team12 , position: position12,   points_per_game:  points_per_game12, total_points: total_points12, yellow_cards: yellow_cards12, red_cards: red_cards12,  goals: goals12, minutes: minutes12, cost: cost12  })
            // const player13 = new Player({name: namePlayer13, surname: surnamePlayer13, player_id: player_id13, real_team: real_team13 , position: position13,   points_per_game:  points_per_game13, total_points: total_points13, yellow_cards: yellow_cards13, red_cards: red_cards13,  goals: goals13, minutes: minutes13, cost: cost13 })
            // const player14 = new Player({name: namePlayer14, surname: surnamePlayer14, player_id: player_id14, real_team: real_team14 , position: position14,   points_per_game:  points_per_game14, total_points: total_points14, yellow_cards: yellow_cards14, red_cards: red_cards14,  goals: goals14, minutes: minutes14, cost: cost14  })
            // const player15 = new Player({name: namePlayer15, surname: surnamePlayer15, player_id: player_id15, real_team: real_team15, position: position15,   points_per_game:  points_per_game15, total_points: total_points15, yellow_cards: yellow_cards15, red_cards: red_cards15,  goals: goals15, minutes: minutes15, cost: cost15  })
            // const player16 = new Player({name: namePlayer16, surname: surnamePlayer16, player_id: player_id16, real_team: real_team16 , position: position16,   points_per_game:  points_per_game16, total_points: total_points16, yellow_cards: yellow_cards16, red_cards: red_cards16,  goals: goals16, minutes: minutes16, cost: cost16  })
            // const player17 = new Player({name: namePlayer17, surname: surnamePlayer17, player_id: player_id17, real_team: real_team17 , position: position17,   points_per_game:  points_per_game17, total_points: total_points17, yellow_cards: yellow_cards17, red_cards: red_cards17,  goals: goals17, minutes: minutes17, cost: cost17  })
            // const player18 = new Player({name: namePlayer18, surname: surnamePlayer18, player_id: player_id18, real_team: real_team18 , position: position18,   points_per_game:  points_per_game18, total_points: total_points18, yellow_cards: yellow_cards18, red_cards: red_cards18,  goals: goals18, minutes: minutes18, cost: cost18 })
            // id_player = player.id
            // id_player2 = player2.id
            // id_player3 = player3.id
            // id_player4 = player4.id
            // id_player4 = player4.id
            // id_player5 = player5.id
            // id_player6 = player6.id
            // id_player7 = player7.id
            // id_player8 = player8.id
            // id_player9 = player9.id
            // id_player10 = player10.id
            // id_player11 = player11.id
            // id_player12 = player12.id
            // id_player13 = player13.id
            // id_player14 = player14.id
            // id_player15 = player15.id
            // id_player16 = player16.id
            // id_player17 = player17.id
            // id_player18 = player18.id


            // const team = new Team({id, name: nameTeam, points})
            // team.owner = id
            
            //  team.players.push(id_player)
            //  team.players.push(id_player2)
            //  team.players.push(id_player3)
            //  team.players.push(id_player4)
            //  team.players.push(id_player5)
            //  team.players.push(id_player6)
            //  team.players.push(id_player7)
            //  team.players.push(id_player8)
            //  team.players.push(id_player9)
            //  team.players.push(id_player10)
            //  team.players.push(id_player11)
            //  team.players.push(id_player12)
            //  team.players.push(id_player13)
            //  team.players.push(id_player14)
            //  team.players.push(id_player15)
            //  team.players.push(id_player16)
            //  team.players.push(id_player17)
            //  team.players.push(id_player18)

            // await users.save()
            // await league.save()
            // await player.save()
            // await player2.save()
            // await player3.save()
            // await player4.save()
            // await player5.save()
            // await player6.save()
            // await player7.save()
            // await player8.save()
            // await player9.save()
            // await player10.save()
            // await player11.save()
            // await player12.save()
            // await player13.save()
            // await player14.save()
            // await player15.save()
            // await player16.save()
            // await player17.save()
            // await player18.save()
            // await team.save()
                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        debugger
        const result = await logic.lineUpTeam(id, code, nameTeam)
        
        
            expect(result).to.exist
            expect(result.length).to.equal(11)
            // expect(result[0].name).to.equal(namePlayer)
            // expect(result[1].name).to.equal(namePlayer2)
            // expect(result[0].points).to.equal(points)
            // expect(result[1].points).to.equal(points)
            // expect(result[0].owner.toString()).to.equal(id)
            // expect(result[1].owner.toString()).to.equal(id2)
        
    })


    it('should fail if the league does not exist', async () => {

        await League.create({ id, name: nameLeague, code })
        await League.deleteMany()
        try {
             await logic.lineUpTeam(id, code, nameTeam)
        } catch(error) {
            
             expect(error).to.exist
             expect(error.message).to.equal(`League with code ${code} does not exist`)
        }
     })

    it('should fail on incorrect user id', async () => {
        id = '5d772fb62bb54120d08d7a7b'
        try {
            await logic.lineUpTeam(id, code, nameTeam)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`User with id ${id} does not exist`)
        }
        
    })

    it('should fail if the team name does not exist', async () => {

        await League.create({ id, name: nameLeague,code  })

       
        try {
            await logic.lineUpTeam(id, code, '12345')
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`Team with name 12345 does not exist`)
        }
        
    })
     
     

    it('should fail on undefined league name', () => 
        expect(() => 
            logic.lineUpTeam(id, code, undefined)
     ).to.throw(`name with value undefined is not a string`)
    )

    it('should fail on undefined user id', () => 
        expect(() => 
            logic.lineUpTeam(undefined, code, nameTeam)
    ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on undefined code', () => 
        expect(() => 
            logic.lineUpTeam(id, undefined, nameTeam)
    ).to.throw(`code with value undefined is not a string`)
    )
    


    it('should fail on non-string team name', () => 
        expect(() => 
            logic.lineUpTeam(id, code, 12345)
    ).to.throw(`name with value 12345 is not a string`)
    )

    it('should fail on non-string user id', () => 
        expect(() => 
            logic.lineUpTeam(12345, code, nameTeam)
    ).to.throw(`id with value 12345 is not a string`)
    )

    it('should fail on non-string code', () => 
        expect(() => 
            logic.lineUpTeam(id, 12345, nameTeam)
    ).to.throw(`code with value 12345 is not a string`)
    )

   
            
     it('should fail on empty id', () => 
        expect(() => 
                logic.lineUpTeam('', code, nameTeam)
        ).to.throw(`id is empty or blank`)
        )

    it('should fail on empty code', () => 
        expect(() => 
                logic.lineUpTeam(id, '', nameTeam)
    ).to.throw(`code is empty or blank`)
        )

    it('should fail on empty name team', () => 
         expect(() => 
                logic.lineUpTeam(id, code, '')
    ).to.throw(`name is empty or blank`)
        )



    after(() => database.disconnect())
})