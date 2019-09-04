const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { Game } = require('../../../models')

describe.only('logic - join game', () => {

    before(() => mongoose.connect('mongodb://localhost/my-stuff-api-test', { useNewUrlParser: true }))

    let name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase
    let hostId, validHost, gameId

    beforeEach(() => {
        name = `gameName-${Math.random()}`
        max_players = Number(Math.random().toFixed())
        initial_stack = Number(Math.random().toFixed())
        initial_bb = Number(Math.random().toFixed())
        initial_sb = Number(Math.random().toFixed())
        blinds_increase = Number(Math.random().toFixed())
        hostId = (new mongoose.Types.ObjectId).toString()
        validHost = hostId.toString()

        return (async () => {
            const newGame = await new Game({ name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase })
            gameId = newGame.id
            newGame.host = mongoose.Types.ObjectId(validHost)
            await newGame.save()
        })()
    })


    it('should succeed on correct data', async () => {
        const result = await logic.joinGame(gameId)
        expect(result).not.to.exist
        const game = await Game.findOne({ _id: gameId })
        expect(game).to.exist
        expect(game.players.length).to.be(1)
    })

    it('should fail if the user already exists', async () => {

        await User.create({ username, email, password })

        try {
            await logic.user.register(username, email, password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with e-mail ${email} already exists.`)
        }
    })


    it('should fail if the username is already taken', async () => {

        await User.create({ username, email, password })

        try {
            await logic.user.register(username, 'another-email@mail.com', password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Username is already taken.`)
        }
    })

    /* Name */
    it('should fail on empty name', () =>
        expect(() =>
            logic.user.register('', email, password)
        ).to.throw('username is empty or blank')
    )

    it('should fail on undefined name', () =>
        expect(() =>
            logic.user.register(undefined, email, password)
        ).to.throw(`username with value undefined is not a string`)
    )

    it('should fail on wrong data type for name', () =>
        expect(() =>
            logic.user.register(123, surname, email, password)
        ).to.throw(`username with value 123 is not a string`)
    )

    /* Email */
    it('should fail on empty email', () =>
        expect(() =>
            logic.user.register(username, '', password)
        ).to.throw('email is empty or blank')
    )

    it('should fail on undefined surname', () =>
        expect(() =>
            logic.user.register(username, undefined, password)
        ).to.throw(`email with value undefined is not a string`)
    )

    it('should fail on wrong data type for email', () =>
        expect(() =>
            logic.user.register(username, 123, password)
        ).to.throw(`email with value 123 is not a string`)
    )

    it('should fail on wrong email format', () =>
        expect(() =>
            logic.user.register(username, 'a@a', password)
        ).to.throw(`email with value a@a is not a valid e-mail`)
    )

    /* Password */
    it('should fail on empty password', () =>
        expect(() =>
            logic.user.register(username, email, '')
        ).to.throw('password is empty or blank')
    )

    it('should fail on undefined password', () =>
        expect(() =>
            logic.user.register(username, email, undefined)
        ).to.throw(`password with value undefined is not a string`)
    )

    it('should fail on wrong data type for password', () =>
        expect(() =>
            logic.user.register(username, email, 123)
        ).to.throw(`password with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})