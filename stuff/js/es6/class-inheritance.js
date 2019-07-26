class Person {
    constructor(name, age, gender) {
        this.name = name
        this.age = age
        this.gender = gender
    }

    toString() {
        return `${this.name}, ${this.age}, ${this.gender}`    
    }
}

class Woman extends Person {
    constructor(name, age) {
        super(name, age, 'female')
    }
}

class Man extends Person {
    constructor(name, age) {
        super(name, age, 'male')
    }
}

const peter = new Man('Peter', 28)
console.log(peter)