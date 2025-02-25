class BarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValue = obj.yValue;
        this.chartHeight = obj.chartHeight || 500; //sets default values
        this.chartWidth = obj.chartWidth || 500;
        this.barWidth = obj.barWidth || 30;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 70;
        this.chartPosY = obj.chartPosY || 600;

        //calcuates the gap
        this.gap = (this.chartWidth - (this.data.length * this.barWidth) - (this.margin * 2)) / (this.data.length - 1); 
        
        // Convert y values to numbers to prevent NaN error
        this.numericData = this.data.map(row => Number(row[this.yValue]) || 0);
        this.maxValue = max(this.numericData); //gets the highest value from the data and sets it as the max value

        
        this.scaler = this.maxValue > 0 ? this.chartHeight / this.maxValue : 1;  // Set the scale based on the max value // ? shortcut for if else statement
        
        this.axisColour = color(0, 0, 0);
        this.barColor = color(36, 114, 240);
        this.axisTextColour = color(0);

        this.numTicks = 15;
        this.tickLength = 10;
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY);
        fill(this.barColor);
        noStroke();

        for (let i = 0; i < this.data.length; i++) {
            let xPos = this.margin + (this.barWidth + this.gap) * i;
            let barHeight = this.numericData[i] * this.scaler;
            
            rect(xPos, 0, this.barWidth, -barHeight); // Draw bars upwards
        }

        pop();
    }

    renderAxis() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(this.axisColour);
        strokeWeight(this.axisThickness);

        // Draw Y-axis
        line(0, 0, 0, -this.chartHeight);
        // Draw X-axis
        line(0, 0, this.chartWidth, 0);

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
            let xPos = this.margin + (this.barWidth + this.gap) * i + this.barWidth / 2;
            
            push();
            translate(xPos, 15); // Move below the axis
            rotate(90); // Rotates text
            
            text(this.data[i][this.xValue], 0, 0);// Loops through each bar and adds labels
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

            //draws lines across chart for each tick
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
        text(xTitle, this.chartPosX + this.chartWidth / 2, this.chartPosY + 90);

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
        textFont("Roboto");
        textAlign(CENTER, CENTER);
        fill(0);
        text(title, this.chartPosX + this.chartWidth / 2, this.chartPosY - this.chartHeight - 60); 
        pop();
    }
}

