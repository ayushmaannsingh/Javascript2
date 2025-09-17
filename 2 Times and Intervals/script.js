// setTimeout.. / clearTimeout

// let tm = setTimeout(function(){
//     console.log("kya haa ba");
// }, 5000);

// clearTimeout(tm);

// setInterval.. / clearInterval 

// let tim = setInterval(function(){
//     console.log("hey ayush");
    
// }, 10000);

// clearInterval(tim);


let count = 10;

let interval = setInterval(function(){
    if(count>=0){
         console.log(count); 
        count--;
        
    }
    else{
        clearInterval(interval);
    }
}, 1000);