# Javascript2  
 In this second part, i learn formvalidation, times and intervals , image project, toster created, this keyword and Oops concept....

# Factory Functions

function PersonMaker(name, age){
  const person = {
  name : name,
  age : age,
  talk() {
     console.log(`Hi, my name is ${this.name}`);
    },
  };

 return person;
 }
 
let p1 = PersonMaker("adam", 25);
let p2 = PersonMaker("AYush", 25);

  

