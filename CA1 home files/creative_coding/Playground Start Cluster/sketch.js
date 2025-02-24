let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth=10;
let margin = 15;
let gap;
let scaler;
let axisThickness=5;
let chartPosX = 50;
let chartPosY = 350;
let axisColour;
let barColour;
let axisTextColour;
let yValues =["Female", "Male"];
let barColors=[];
let maxValue;

let xValue = "Age_Group";
let yValueTotal = "Total"

function preload() {
    data = loadTable('data/Combined.csv', 'csv', 'header');
}

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    // Calculate the gap based on the number of bars 
    gap = (chartWidth - (cleanedData.length * barWidth * yValueTotal.length) - (margin*2))/(cleanedData.length - 1);
    

    // Calculate the scaler based on the maximum value of the "Female" column
    let maxValues = [];

    let maxFemales = max(cleanedData.map(row => row.Female));
   
    let maxMales = max(cleanedData.map(row => row.Male));

    maxValues.push(maxFemales,maxMales)
   maxValue = max(maxValues)
   
    
    scaler = chartHeight/(maxValue);


    axisColour = color(255, 204, 0);
    barColour = color(0, 200, 50);
    axisTextColour = color(125);
}

function draw() {
    background(200);

    push();
    translate(chartPosX, chartPosY);
    noFill();
    stroke(axisColour);
    strokeWeight(axisThickness);
    line(0, 0, 0, -chartHeight); // Y axis
    line(0, 0, chartWidth, 0);   // X axis

    push();
    translate(margin, 0);
    // for (let i = 0; i < cleanedData.length; i++) {
    //     let xPos = (barWidth + gap) * i;

    //     // Draw the bars for the "Female" data
    //     fill(barColour);
    //     noStroke();
    //     rect(xPos, 0, barWidth, -cleanedData[i][yValues[0]] * scaler);

    //     // Add the x-axis labels under the bars
    //     fill(axisTextColour);
    //     noStroke();
    //     textAlign(LEFT, CENTER);
    //     textSize(8);
    //     push();
    //     translate(xPos + barWidth / 2, 10);
    //     rotate(60);
    //     text(cleanedData[i][xValue], 0, 0);
    //     pop();
    // }

    for(let i=0; i<cleanedData.length; i++){
        push();
        translate((gap + (barWidth*2))*i,0)


        for (let j=0; j<yValues.length; j++ ) {
           
            noStroke();
            fill(random(255))
            rect(barWidth*j,0,barWidth,-100);

        }
        pop()
    }

    pop();

    pop();
}

function cleanData() {
    
    for (let i = 0; i < data.rows.length; i++) {
        cleanedData.push(data.rows[i].obj);
    }

  
    for (let i = 0; i < cleanedData.length; i++) {
        cleanedData[i].Female = parseInt(cleanedData[i].Female);
        cleanedData[i].Male = parseInt(cleanedData[i].Male);
        cleanedData[i].Total = parseInt(cleanedData[i].Total);
    }
}
