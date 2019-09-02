require('dotenv').config()

const { expect } = require('chai')
const { database , models : { Course } } = require('../../data')
const createCourse = require('.')

const { env : { DB_URL_TEST } } = process

describe('logic - create course' , () => {
    before( () => database.connect(DB_URL_TEST))

    let year , shirt , activities , enrollments

    beforeEach( async () => {
        
    })
})