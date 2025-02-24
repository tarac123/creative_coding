let data;
let cleanedData = [];
let chartHeight = 300;
let chartWidth = 400;
let barWidth = 30;
let margin = 15;
let gap;
let scaler;
let axisThickness = 5;
let chartPosX = 50;
let chartPosY = 200;
let axisColour;
let barColour;
let axisTextColour;
let yValue = "Female";
let xValue = "Age_Group";

function preload() {
    data = loadTable('data/Combined.csv', 'csv', 'header');
}

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
    noLoop();
    cleanData();

    // Calculate the gap based on the number of bars after data is cleaned
    gap = (chartWidth - (cleanedData.length * barWidth) - (margin * 2)) / (cleanedData.length - 1);
    
    // Calculate the scaler based on the maximum value of the "Female" column
    scaler = chartHeight / max(cleanedData.map(row => row.Female));

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
    for (let i = 0; i < cleanedData.length; i++) {
        let xPos = (barWidth + gap) * i;

        // Draw the bar for the "Female" data
        fill(barColour);
        noStroke();
        rect(xPos, 0, barWidth, -cleanedData[i][yValue] * scaler);

        // Add the x-axis label under the bar
        fill(axisTextColour);
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(8);
        push();
        translate(xPos + barWidth / 2, 10);
        rotate(60);
        text(cleanedData[i][xValue], 0, 0);
        pop();
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
