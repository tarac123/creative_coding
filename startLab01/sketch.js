let age

const dob="31/05/2002";

// let yobString = parseInt(dob.substring(6,10));
//let yobNum = parseInt(yobString);

age = 2025 - parseInt(dob.substring(6,10));

let friends = ["John", "Mary", "Peter", "Susan"];

// let arrayLength = friends.length

for(let num=0; num<friends.length; num++){
    console.log(friends[num])
} 


friends.splice(2,0,"Brian")

let myFriend = {name:"John", age:22,eirCode:"A93V43"}