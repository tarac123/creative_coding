let data;
let cleanedData = [];
let charts=[];

 
function preload(){
    data = loadTable('data/Combined.csv','csv','header')
}
 
function setup() {
    createCanvas(1000, 1000);
    angleMode(DEGREES);
    noLoop();

    cleanData();

    charts.push(new BarChart({
        data: cleanedData,
        xValue: "Age_Group",
        yValue: "Male",
        // chartHeight: 400,
        // chartWidth: 400,
        // barWidth: 25,
        // margin: 10,
        // axisThickness: 10,
        // xPos: 3,
        // yPos: 50
    }
    ))
}

    
    // charts.push(new BarChart(cleanedData,"Age_Group","Male",400,400,25,10,10,3,50,950))
    // charts.push(new BarChart(cleanedData,"Age_Group","Total",400,400,25,10,10,3,550,450))
    

 
function draw(){
    background(190)
    charts.forEach(chart => {
        chart.renderBars();
        chart.renderLabels();
        chart.renderAxis();
        chart.renderTicks();
    })
}

 
function cleanData(){
    for(let i=0; i<data.rows.length; i++){
    cleanedData.push(data.rows[i].obj)
    }
 
    for(let i=0; i<cleanedData.length; i++){
        cleanedData[i].Female = parseInt(cleanedData[i].Female)
        cleanedData[i].Male = parseInt(cleanedData[i].Male)
        cleanedData[i].Total = parseInt(cleanedData[i].Total)
    }
}


let friends =[];
friends.push(new Friend ("Dave", 112))
friends.push(new Friend ("Roger", 114))
console.log(friends)
