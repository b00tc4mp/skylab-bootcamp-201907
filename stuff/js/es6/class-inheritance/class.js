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

const peter = new Person('Peter', 28, 'male')

console.log(peter)