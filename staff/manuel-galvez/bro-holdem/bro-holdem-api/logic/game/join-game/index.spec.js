const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { Game, Player, User } = require('../../../models')

describe('logic - join game', () => {

    before(() => mongoose.connect('mongodb://localhost/bro-holdem-test', { useNewUrlParser: true }))

    let username, email, password, hostId
    let username2, email2, password2, joinerId
    let name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase
    let gameId

    beforeEach(() => {
        // User 1: Host
        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        // User 2: Joiner
        username2 = `username-${Math.random()}`
        email2 = `email-${Math.random()}@email.com`
        password2 = `password-${Math.random()}`


        // Game
        name = `gameName-${Math.random()}`
        max_players = Number((Math.random() * (6 - 4) + 4).toFixed())
        initial_stack = Number(Math.random().toFixed())
        initial_bb = Number(Math.random().toFixed())
        initial_sb = Number(Math.random().toFixed())
        blinds_increase = Number(Math.random().toFixed())


        return (async () => {

            // Register users
            await User.deleteMany()
            await Game.deleteMany()
            const host = new User({ username, email, password })
            hostId = host.id
            const joiner = new User({ username: username2, email: email2, password: password2 })
            joinerId = joiner.id

            // Replicate host game (create new game and add host as a player)
            const newGame = new Game({ name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase })
            gameId = newGame.id
            newGame.host = hostId

            // Create new instance of player
            const newPlayer = new Player({
                position: newGame.players.length,
                current_stack: initial_stack,
                cards: [],
                in_hand: false,
                bet_amount: 0
            })
            newPlayer.user = hostId
            newGame.players.push(newPlayer)

            return Promise.all([host.save(), joiner.save(), newGame.save()])
        })()
    })


    it('should succeed on correct data', async () => {
        const result = await logic.joinGame(gameId, joinerId)
        expect(result).not.to.exist
        const game = await Game.findById(gameId)
        expect(game).to.exist
        expect(game.players.length).to.equal(2)
        expect(String(game.players[0].user)).to.equal(hostId)
        expect(String(game.players[1].user)).to.equal(joinerId)
    })

    it('should fail if the game does not exist', async () => {

        try {
            await logic.joinGame('5d6f7f1a13d960702965554a', joinerId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Game with id 5d6f7f1a13d960702965554a does not exist.`)
        }
    })

    it('should fail if the user does not exist', async () => {

        try {
            await logic.joinGame(gameId, '5d6f7f1a13d960702965554c')
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with id 5d6f7f1a13d960702965554c does not exist.`)
        }
    })

    it('should fail if the playing room is full', async () => {
        const game = await Game.findById(gameId)
        game.max_players = 1
        await game.save()

        try {
            await logic.joinGame(gameId, joinerId)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('Game room is full.')
        }
    })

    /* Name */
    it('should fail on empty game ID', () =>
        expect(() =>
            logic.joinGame('', joinerId)
        ).to.throw('Game ID is empty or blank')
    )

    it('should fail on undefined game ID', () =>
        expect(() =>
            logic.joinGame(undefined, joinerId)
        ).to.throw(`Game ID with value undefined is not a valid ObjectId`)
    )

    it('should fail on empty user ID', () =>
        expect(() =>
            logic.joinGame(gameId, '')
        ).to.throw(`User ID is empty or blank`)
    )

    it('should fail on undefined user ID', () =>
        expect(() =>
            logic.joinGame(gameId, undefined)
        ).to.throw(`User ID with value undefined is not a valid ObjectId`)
    )

    after(() => mongoose.disconnect())
})
