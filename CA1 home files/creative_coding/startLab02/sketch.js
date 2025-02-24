// creates objects
let friend01 = {name:"David", age:106, bowling:true};
let friend02 = {name:"Peter", age:29, bowling:false};
let friend03 = {name:"Mary", age:29, bowling:false};
let friend04 = {name:"Brid", age:65, bowling:true};
let friend05 = {name:"Paul", age:55, bowling:true};

// creates empty friends array
let friends = [];

// creates empty array for friend ages
let friendAges = [];

// creates empty bowling ages array
let friendBowlingAges = [];

// fills the friends array
friends.push(friend01,friend02,friend03,friend04,friend05);

// gets each age from the object (if the object index is less than 5) and fills the friendsAge array
for (
    let index=0; index<5; index++ ) {
        friendAges.push(friends[index].age)
    }

// gets each friend who likes bowling and gets their age and fills the friendsBowlingAge array
for (
    let index=0; index<5; index++ ) {
        if(friends[index].bowling == true){
        friendBowlingAges.push(friends[index].age)
        }
    }
        

function calcAvg(arrayNums) {
    let startValue= 0; 
    for (let i=0; i<arrayNums.length; i++){
        startValue = startValue + arrayNums[i]
    }
    return startValue/arrayNums.length;
}


function median(arrayNums){
    if (arrayNums.length%2==0){
        console.log("it's even")
    }
    else {
        return arrayNums[Math.floor(arrayNums.length/2)]
    }
}

function median(arrayNums){

    arrayNums.sort((a,b)=>(a-b))
    if (arrayNums.length%2==0){
        let endNum = arrayNums.length/2
        let startNum = endNum-1
        return (arrayNums[startNum]+arrayNums[endNum])/2
    }
    else {
        return arrayNums[Math.floor(arrayNums.length/2)]
    }
}

