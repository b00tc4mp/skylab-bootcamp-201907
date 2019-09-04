const mongoose = require('mongoose')
const { expect } = require('chai')
const logic = require('../../../logic')
const { Game } = require('../../../models')

describe('logic - host game', () => {

    before(() => {
        mongoose.connect('mongodb://localhost/bro-holdem-test', { useNewUrlParser: true })
    })

    let name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase, game_status
    let hostId, validHost

    beforeEach(() => {

        name = `gameName-${Math.random()}`
        max_players = Number((Math.random() * (6 - 4) + 4).toFixed())
        initial_stack = Number(Math.random().toFixed())
        initial_bb = Number(Math.random().toFixed())
        initial_sb = Number(Math.random().toFixed())
        blinds_increase = Number(Math.random().toFixed())
        hostId = new mongoose.Types.ObjectId
        validHost = String(hostId)
    })

    it('should succeed on correct data', async () => {
        const result = await logic.hostGame(
            name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase, validHost
        )
        expect(result).to.exist

        const retrievedGame = await Game.findById(result)
        expect(retrievedGame).to.exist
        expect(retrievedGame.name).to.equal(name)
        expect(retrievedGame.max_players).to.equal(max_players)
        expect(retrievedGame.initial_stack).to.equal(initial_stack)
        expect(retrievedGame.initial_bb).to.equal(initial_bb)
        expect(retrievedGame.initial_sb).to.equal(initial_sb)
        expect(retrievedGame.blinds_increase).to.equal(blinds_increase)
        expect(String(retrievedGame.host)).to.equal(validHost)
        expect(retrievedGame.participants.length).to.equal(1)
        expect(String(retrievedGame.participants[0])).to.equal(validHost)
        expect(String(retrievedGame.game_status)).to.equal('open')
    })

    it('should fail if game already exists', async () => {

        await Game.deleteMany()
        const game = await Game.create({ name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase, validHost })

        try {
            await logic.hostGame(name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase, validHost)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal('Game already exists.')
        }
    })


    it('should fail on empty name', () => {
        expect(() =>
            logic.hostGame('', max_players, initial_stack, initial_bb, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, 'name is empty or blank')
    })

    it('should fail on undefined name', () => {
        expect(() =>
            logic.hostGame(undefined, max_players, initial_stack, initial_bb, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, `name with value undefined is not a string`)
    })

    it('should fail on non-valid data type for name', () => {
        expect(() =>
            logic.hostGame(123, max_players, initial_stack, initial_bb, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, `name with value 123 is not a string`)
    })

    it('should fail on empty max_players', () => {
        expect(() =>
            logic.hostGame(name, '', initial_stack, initial_bb, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, 'max_players is empty or blank')
    })

    it('should fail on undefined name', () => {
        expect(() =>
            logic.hostGame(name, undefined, initial_stack, initial_bb, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, `max_players with value undefined is not a number`)
    })

    it('should fail on non-valid data type for name', () => {
        expect(() =>
            logic.hostGame(name, 'blablabla', initial_stack, initial_bb, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, `max_players with value blablabla is not a number`)
    })

    it('should fail on empty initial_stack', () => {
        expect(() =>
            logic.hostGame(name, max_players, '', initial_bb, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, 'initial_stack is empty or blank')
    })

    it('should fail on undefined initial_stack', () => {
        expect(() =>
            logic.hostGame(name, max_players, undefined, initial_bb, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, `initial_stack with value undefined is not a number`)
    })

    it('should fail on non-valid data type for initial_stack', () => {
        expect(() =>
            logic.hostGame(name, max_players, 'blablabla', initial_bb, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, `initial_stack with value blablabla is not a number`)
    })

    it('should fail on empty initial_bb', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, '', initial_sb, blinds_increase, hostId)
        ).to.throw(Error, 'initial_bb is empty or blank')
    })

    it('should fail on undefined initial_bb', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, undefined, initial_sb, blinds_increase, hostId)
        ).to.throw(Error, `initial_bb with value undefined is not a number`)
    })

    it('should fail on non-valid data type for initial_bb', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, 'blablabla', initial_sb, blinds_increase, hostId)
        ).to.throw(Error, `initial_bb with value blablabla is not a number`)
    })

    it('should fail on empty initial_sb', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, initial_bb, '', blinds_increase, hostId)
        ).to.throw(Error, 'initial_sb is empty or blank')
    })

    it('should fail on undefined initial_sb', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, initial_bb, undefined, blinds_increase, hostId)
        ).to.throw(Error, `initial_sb with value undefined is not a number`)
    })

    it('should fail on non-valid data type for initial_sb', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, initial_bb, 'blablabla', blinds_increase, hostId)
        ).to.throw(Error, `initial_sb with value blablabla is not a number`)
    })

    it('should fail on empty blinds_increase', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, initial_bb, initial_sb, '', hostId)
        ).to.throw(Error, 'blinds_increase is empty or blank')
    })

    it('should fail on undefined blinds_increase', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, initial_bb, initial_sb, undefined, hostId)
        ).to.throw(Error, `blinds_increase with value undefined is not a number`)
    })

    it('should fail on non-valid data type for blinds_increase', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, initial_bb, initial_sb, 'blablabla', hostId)
        ).to.throw(Error, `blinds_increase with value blablabla is not a number`)
    })

    it('should fail on empty host', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase, '')
        ).to.throw(Error, 'host ID is empty or blank')
    })

    it('should fail on undefined host', () => {
        expect(() =>
            logic.hostGame(name, max_players, initial_stack, initial_bb, initial_sb, blinds_increase, undefined)
        ).to.throw(Error, `host ID with value undefined is not a valid ObjectId`)
    })

    after(() => mongoose.disconnect())
})