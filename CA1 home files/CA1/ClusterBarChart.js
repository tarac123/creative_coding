class ClusterBarChart {
    constructor(obj) {
        this.data = obj.data;
        this.xValue = obj.xValue;
        this.yValues = obj.yValues;
        this.chartHeight = obj.chartHeight || 400;
        this.chartWidth = obj.chartWidth || 1000;
        this.barWidth = obj.barWidth || 25;
        this.margin = obj.margin || 10;
        this.axisThickness = obj.axisThickness || 1;
        this.chartPosX = obj.chartPosX || 100;
        this.chartPosY = obj.chartPosY || 1350;

        

        // Sets colors for the bars
        this.barColours = obj.barColours || [color(162, 194, 245), color(36, 114, 240)]; // colors for different categories
        this.axisTextColour = obj.axisTextColour || color(0);  // black for axis text

        // Calculate the gap between clusters
        // Each cluster contains bars for each yValue side by side
        const clusterWidth = this.barWidth * this.yValues.length;
        this.gap = (this.chartWidth - (this.data.length * clusterWidth) - (this.margin * 2)) / (this.data.length - 1);

        // Find the max value across all yValues
        this.maxValue = 0;
        this.data.forEach(row => {
            this.yValues.forEach(key => {
                this.maxValue = Math.max(this.maxValue, row[key] || 0);
            });
        });

        // Set the scale based on the max value
        this.scaler = this.maxValue > 0 ? this.chartHeight / this.maxValue : 1;

        // Ticks for axis rendering
        this.numTicks = 5;  // Number of ticks on Y axis
        this.tickLength = 5;  // Length of tick marks
        
    }

    renderBars() {
        push();
        translate(this.chartPosX, this.chartPosY); 
        
        for (let i = 0; i < this.data.length; i++) {
            const clusterWidth = this.barWidth * this.yValues.length;
            let clusterXPos = this.margin + (clusterWidth + this.gap) * i;
            
            for (let j = 0; j < this.yValues.length; j++) {
                let barXPos = clusterXPos + j * this.barWidth; // meant to put bars side by side
                
                let barHeight = this.data[i][this.yValues[j]] * this.scaler;
                
                fill(this.barColours[j % this.barColours.length]); // Alternate colours for each bar
                noStroke();
                rect(barXPos, -barHeight, this.barWidth, barHeight); 
                
                // Labels on top of bars
                fill(0);
                textAlign(CENTER, BOTTOM);
                textSize(10);
                text(this.data[i][this.yValues[j]].toFixed(2), barXPos + this.barWidth / 2, -barHeight - 5);
            }
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

        for (let i = 0; i < this.data.length; i++) { // loops through index of dataset
            
            const clusterWidth = this.barWidth * this.yValues.length; //width of one bar multiplied by the amounnt of bars in each cluster 
            let xPos = this.margin + (clusterWidth + this.gap) * i + clusterWidth / 2;
            
            push();
            translate(xPos, 15); // inserts below the axis in the middle of the cluster
            rotate(90); 
            text(this.data[i][this.xValue], 0, 0); // prints the value on the top of each cluster bar
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

            stroke(0);
            line(0, yPos, -this.tickLength, yPos); // Draws ticks
            noStroke();
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
        text(xTitle, this.chartPosX + this.chartWidth / 2, this.chartPosY + 100);

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
        textSize(18);
        textStyle(BOLD);
        textFont("Roboto");
        textAlign(RIGHT, RIGHT);
        fill(0);
        text(title, this.chartPosX + this.chartWidth / 2, this.chartPosY - this.chartHeight - 40); 
        pop();
    }
    

    renderLegend() {
        push();
        translate(this.chartPosX + this.chartWidth + 20, this.chartPosY - this.chartHeight);
        textSize(12);
        textAlign(LEFT, CENTER);
        
        for (let i = 0; i < this.yValues.length; i++) {
            fill(this.barColours[i % this.barColours.length]);
            rect(0, i * 25, 15, 15);
            
            fill(this.axisTextColour);
            text(this.yValues[i], 25, i * 25 + 7);
        }
        pop();
    }

    
}