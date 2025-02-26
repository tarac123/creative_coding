class PieChart {
    constructor(obj) {
        this.chartPosX = obj.chartPosX || 700;
        this.chartPosY = obj.chartPosY || 600;
        this.chartHeight = obj.chartHeight || 300;

        this.outerData = obj.outerData; // Top 3 outer values
        this.innerData = obj.innerData; // Top 3 inner values
        
        //  label names for outer and inner data 
        this.outerLabels = obj.outerLabels || []; //tempo
        this.innerLabels = obj.innerLabels || []; //valence
        
        this.outerColors = [color(7, 15, 99), color(14, 28, 173), color(17, 37, 245)]; // Colors for outer pie
        this.innerColors = [color(93, 108, 252), color(140, 150, 250), color(189, 195, 252)]; // Colors for inner pie

        
        // Title for the chart
        this.title = obj.title || "Attributes"; //default titles, actual title is in sketch.js
        this.outerTitle = obj.outerTitle || "Outer";
        this.innerTitle = obj.innerTitle || "Inner";
    }



    renderPie() {
        push();
        translate(this.chartPosX, this.chartPosY);
        stroke(255); // White stroke on outer and inner
        strokeWeight(2);

        // Calculate total sum beforehand
        let totalOuter = sum(this.outerData);
        let totalInner = sum(this.innerData);

        // Draw outer pie chart
        let lastAngle = 0;
        for (let i = 0; i < this.outerData.length; i++) { //iterates through outer data
            let angle = map(this.outerData[i], 0, totalOuter, 0, 360); // calculates segment for each value 
            fill(this.outerColors[i]);  
            arc(0, 0, this.chartHeight, this.chartHeight, lastAngle, lastAngle + angle, PIE); //draws pie segments
            lastAngle += angle; //increments angle for next segement
        }

        // Draw inner pie chart
        lastAngle = 0;
        for (let i = 0; i < this.innerData.length; i++) { 
            let angle = map(this.innerData[i], 0, totalInner, 0, 360);
            fill(this.innerColors[i]);
            arc(0, 0, this.chartHeight * 0.6, this.chartHeight * 0.6, lastAngle, lastAngle + angle, PIE); //inner pie doees the  same thing but at 60% of the size of outer pie 
            lastAngle += angle; 
        }
        pop();
    }
    
    
    renderTitle() {
        push();
        fill(0);
        textSize(18);
        textFont("Roboto");
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text(this.title, this.chartPosX, this.chartPosY - this.chartHeight/2 - 40);
    }
    
    renderLegend() {
        push();
        let legendX = this.chartPosX + this.chartHeight / 2 + 20;
        let legendY = this.chartPosY - this.chartHeight / 3;
        let rectSize = 15;
        let lineHeight = 25;
        
        textAlign(LEFT, CENTER);
        textSize(12);
        
        // Title for outer data
        fill(0);
        textStyle(BOLD);
        text(this.outerTitle, legendX, legendY - lineHeight);
        textStyle(NORMAL);
        
        // Render outer data legend items
        for (let i = 0; i < this.outerLabels.length; i++) {
            fill(this.outerColors[i]);
            rect(legendX, legendY + i * lineHeight, rectSize, rectSize);
            
            fill(0);
            text(this.outerLabels[i] + ": " + this.outerData[i].toFixed(1), 
                 legendX + rectSize + 5, 
                 legendY + i * lineHeight + rectSize / 2);
        }
    
        // Title for inner data (with spacing)
        let innerLegendY = legendY + (this.outerLabels.length + 1) * lineHeight;
        fill(0);
        textStyle(BOLD);
        text(this.innerTitle, legendX, innerLegendY - lineHeight);
        textStyle(NORMAL);
        
        // Render inner data legend items
        for (let i = 0; i < this.innerLabels.length; i++) {
            fill(this.innerColors[i]);
            rect(legendX, innerLegendY + i * lineHeight, rectSize, rectSize);
            
            fill(0);
            text(this.innerLabels[i] + ": " + this.innerData[i].toFixed(2), 
                 legendX + rectSize + 5, 
                 innerLegendY + i * lineHeight + rectSize / 2);
        }

        pop();
    }
}

function sum(arr) {
    return arr.reduce((a, b) => a + b, 0); //sums up all values in an array to get total to work out segment sizes
}

