class User {
    constructor(username){
        this.username = username
    }

    logMe(){
        console.log(`USERNAME is ${this.username}`);
    }
}

class Teacher extends User{
    constructor(username, email, password){
        super(username)
        this.email = email
        this.password = password
    }

    addCourse(){
        console.log(`A new course was added by ${this.username}`);
    }
}

const chai = new Teacher("chai", "chai@teacher.com", "123")

chai.logMe()
const masalaChai = new User("masalaChai")

masalaChai.logMe()

console.log(chai instanceof User);


// Inheritance is a mechanism that allows us to create on the basis of already existing classes.

class Student extends Person {
    constructor (name, age, marks){
        super(name, age);
        this.marks = marks;
    }  
    greet() {
        return "AYush";
    }
}

let s1 = new Student("Ayush", 22, 94);
    
