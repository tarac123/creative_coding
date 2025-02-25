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
        this.chartPosX = obj.chartPosX || 70;
        this.chartPosY = obj.chartPosY || 2250;

        //calcuates the gap
        this.gap = (this.chartWidth - (this.data.length * this.barHeight) - (this.margin * 2)) / (this.data.length - 1); 
        
        // Convert y values to numbers to prevent NaN error
        this.numericData = this.data.map(row => Number(row[this.xValue]) || 0);
        this.maxValue = max(this.numericData); //gets the highest value from the data and sets it as the max value

        
        this.scaler = this.maxValue > 0 ? this.chartWidth / this.maxValue : 1;  // Set the scale based on the max value // ? shortcut for if else statement
        
        this.axisColour = color(0, 0, 0);
        this.barColor = color(128, 235, 52, 100);
        this.axisTextColour = color(0);

        this.numTicks = 4;
        this.tickLength = 10;
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        fill(this.barColor);
        noStroke();
    
        for (let i = 0; i < this.data.length; i++) {
            let yPos = this.margin + (this.barHeight + this.gap) * i;

            let barWidth = this.numericData[i] * this.scaler;
            
            rect(0, yPos, barWidth, this.barHeight); // Draw horizontal bars
        }
        console.log(this.numericData);
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

        for (let i = 0; i < this.data.length; i++) { //this.data.length is the total number of data entries in the array (15)
            let yPos = this.margin + (this.barHeight + this.gap) * i + this.barHeight / 2;
            translate(-10, yPos); // Move left of the bar
            textAlign(RIGHT, CENTER); // Align correctly
            rotate(0);
            push();

            
            text(this.data[i][this.yValue], 0, 0);// Loops through each bar and adds labels
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
            let xPos = i * pixelIncrement; //along the X axis
            let tickValue = (i * tickIncrement).toFixed(2); // toFixed(2) allows the value to have 2 numbrs after the decimal
    
            line(xPos, 0, xPos, -this.tickLength); // Draws ticks along X-axis
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
        text(xTitle, this.chartPosX + this.chartWidth / 2, this.chartPosY + 40);

        // Y-Axis Title
        push();
        translate(this.chartPosX - 50, this.chartPosY - this.chartHeight / 2);
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
}

