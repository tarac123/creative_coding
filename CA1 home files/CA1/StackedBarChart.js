class StackedBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.chartHeight = obj.chartHeight || 500; //sets default values
        this.chartWidth = obj.chartWidth || 500;
        this.barWidth = obj.barWidth || 30;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 700;
        this.chartPosY = obj.chartPosY || 600;
        

        // Set colors for the bars
        this.barColours = obj.barColours || [color(239, 149, 252), color(140, 142, 250)]; // colors for stacking
        this.axisTextColour = obj.axisTextColour || color(0);  // black for axis text

        // Calculates the gap 
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin*2)) / (this.data.length - 1);

        // Sums yValues for each row and find the max value
        // gets the highest value from the data and sets it as the max value
        this.maxValue = 0;
        this.data.forEach(row => {
            let total = this.yValues.reduce((sum, key) => sum + (row[key] || 0), 0);
            this.maxValue = Math.max(this.maxValue, total);
        });

        // Set the scale based on the max value
        this.scaler = this.chartHeight / this.maxValue; //scales the data to the chart height

        // Ticks for axis rendering
        this.numTicks = 5;  // Number of ticks on Y axis
        this.tickLength = 5;  // Length of tick marks
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY); 
        for (let i = 0; i < this.data.length; i++) {
            let xPos = this.margin + (this.barWidth + this.gap) * i;
            push();
            translate(xPos, 0);  // Translate to the current bars x position
        
            // Draw the stacked bars
            let totalHeight = 0;  // To track the stack height
            for (let j = 0; j < this.yValues.length; j++) { //loops over all the metrics (colunms) (danceability, energy) for the current song (i).
                fill(this.barColours[j % this.barColours.length]);  //goes through barColours array and sets the fill 
                noStroke();
        
                let barHeight = this.data[i][this.yValues[j]] * this.scaler; // gets the data from the yvalue column and scales it to the chart height
                
                
                rect(0, -totalHeight - barHeight, this.barWidth, barHeight);  // Draws each bar at the correct position
                totalHeight += barHeight;  // Stacks the bars
            }
            pop();
        }
        pop();
    }
    
    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        noFill();
        stroke(0);  
        strokeWeight(this.axisThickness);
        line(0, 0, 0, -this.chartHeight); // Y axis
        line(0, 0, this.chartWidth, 0); // X axis
        pop();
    }

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);
        fill(this.axisTextColour);
        noStroke();
        textAlign(LEFT);
        textSize(12);

        for (let i = 0; i < this.data.length; i++) {
            let xPos = this.margin + (this.barWidth + this.gap) * i + this.barWidth / 2;
            
            push();
            translate(xPos, 15); // inserts below the axis
            rotate(90); 
            text(this.data[i][this.xValue], 0, 0);
            pop();
        }

        pop();
    }

    renderTicks() {
        push();
        translate(this.chartPosX, this.chartPosY);
        strokeWeight(this.axisThickness);
        textSize(12);
        textAlign(RIGHT, CENTER);
        fill(this.axisTextColour);
        
        let tickIncrement = this.maxValue / this.numTicks;
        let pixelIncrement = this.chartHeight / this.numTicks;

        for (let i = 0; i <= this.numTicks; i++) {
            let yPos = -i * pixelIncrement;
            let tickValue = (i * tickIncrement).toFixed(2); //toFixed(2) adds 2 places after the decimal point

            line(0, yPos, -this.tickLength, yPos); // Draws ticks
            text(tickValue, -this.tickLength - 5, yPos); // Labels ticks

            //Adds grid lines
            stroke(220);
            strokeWeight(0.5);
            line(0, yPos, this.chartWidth, yPos);
        }
        pop();

        
    }

    renderAxisTitles(xTitle, yTitle) {
        push();
        textSize(16);
        fill(0);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        // X-Axis Title
        text(xTitle, this.chartPosX + this.chartWidth / 2, this.chartPosY + 160);

        // Y-Axis Title
        push();
        translate(this.chartPosX - 60, this.chartPosY - this.chartHeight / 2);
        rotate(-90);
        
        text(yTitle, 0, 0);
        pop();

        pop();
    }

    renderTitle(title) {
        push();
        textSize(16);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        fill(0);
        text(title, this.chartPosX + this.chartWidth / 2, this.chartPosY - this.chartHeight - 60); 
        pop();
    }

    renderLegend() {
        push();
        translate(this.chartPosX + this.chartWidth + 20, this.chartPosY - this.chartHeight);//  Moves the legend outside the chart to the right
        textSize(12);
        textAlign(LEFT, CENTER);
        
        for (let i = 0; i < this.yValues.length; i++) { //loops through each variable in this.yValues
            fill(this.barColours[i % this.barColours.length]); // loops through the barColours array
            rect(0, i * 25, 15, 15); // Draws a box for each variable
            
            fill(this.axisTextColour);
            text(this.yValues[i], 25, i * 25 + 7); // labels boxs
        }
        pop();
    }
}