class HorizontalBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 500; //sets default values
        this.chartWidth = obj.chartWidth || 500;
        this.barHeight = obj.barHeight || 30; // changed this from bar width to adapt to being horizontal in this chart
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 150;
        this.chartPosY = obj.chartPosY || 2250;

        //calcuates the gap
        this.gap = (this.chartHeight - (this.data.length * this.barHeight) - (this.margin * 2)) / (this.data.length - 1); 
        
        // Convert y values to numbers to prevent NaN error
        this.numericData = this.data.map(row => Number(row[this.xValue]) || 0);
        this.maxValue = max(this.numericData); //gets the highest value from the data and sets it as the max value

        
        this.scaler = this.maxValue > 0 ? this.chartWidth / this.maxValue : 1;  // Set the scale based on the max value // ? shortcut for if else statement
        
        this.axisColour = color(0, 0, 0);
        this.barColor = color(36, 114, 240);
        this.axisTextColour = color(0);

        this.numTicks = 10;
        this.tickLength = 10;
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        push();
        translate(0,-this.margin * 2);

        fill(this.barColor);
        noStroke();
    
        for (let i = 0; i < this.data.length; i++) {
            let yPos = this.margin + (this.barHeight + this.gap) * i;

            let barWidth = this.numericData[i] * this.scaler;
            
            rect(0, -yPos, barWidth, this.barHeight); // Draw horizontal bars
        }
        pop();
        pop();
    }
    

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);
    
        // Draw X-axis (horizontal axis)
        line(0, 0, this.chartWidth, 0);  // From left to right
    
        // Draw Y-axis (vertical axis)
        line(0, 0, 0, -this.chartHeight);  // From top to bottom
    
        pop();
    }
    

    renderLabels() {
        push();
        translate(this.chartPosX, this.chartPosY);
        fill(this.axisTextColour);
        noStroke();
        textAlign(LEFT);
        textSize(12);

        for (let i = 0; i < this.data.length; i++) {  //this.data.length = the total number of data entries in the array (15)
            let yPos = this.margin + (this.barHeight + this.gap) * i + this.barHeight / 2;
            push();
            translate(-10, -yPos); // Move left of the bar
            textAlign(RIGHT, RIGHT); 
            push();

            
            text(this.data[i][this.yValue], 0, 0);// Loops through each value and adds labels
            pop();
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
        let pixelIncrement = this.chartWidth / this.numTicks;
    
        for (let i = 0; i <= this.numTicks; i++) { 
            let xPos = i * pixelIncrement; 
            let tickValue = (i * tickIncrement).toFixed(2); // toFixed(2) allows the value to have 2 numbrs after the decimal
    
            line(0, xPos, this.tickLength, xPos); // Draws ticks
            text(tickValue, xPos, this.tickLength + 5); // Labels ticks below the axis
    
            // Draw horizontal grid lines across the chart for each tick
            stroke(220);
            strokeWeight(0.5);
            line(xPos, 0, xPos, -this.chartHeight);
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
        text(yTitle, this.chartPosX + this.chartWidth / 2, this.chartPosY + 40);

        // Y-Axis Title
        push();
        translate(this.chartPosX - 100, this.chartPosY - this.chartHeight / 2);
        rotate(-90);
        
        text(xTitle, 0, 0);
        pop();

        pop();
    }

    renderTitle(title) {
        push();
        textSize(16);
        textStyle(BOLD);
        textFont("Roboto");
        textAlign(RIGHT, RIGHT);
        fill(0);
        text(title, this.chartPosX + this.chartWidth / 2, this.chartPosY - this.chartHeight - 60); 
        pop();
    }
}