class BarChart {
    constructor(_data,_xValue,_yValue,_chartHeight,_chartWidth,_barWidth,_margin,_scaler,_axisThickness,_chartPosX,_chartPosY,_axisColour,_barColor,_axisTextColour){
        
        this.data = _data;
        this.xValue = _xValue;
        this.yValue = _yValue;
        this.chartHeight = _chartHeight;
        this.chartWidth = _chartWidth;
        this.barWidth =_barWidth;
        this.margin = _margin;
        this.axisThickness = _axisThickness;
        this.chartPosX = _chartPosX;
        this.chartPosY = _chartPosY;

        this.gap = (this.chartWidth - (this.data.length * this.barWidth ) - (this.margin*2)) / (this.data.length - 1);
        this.scaler = this.chartHeight / (max(cleanedData.map(row => row[this.yValue])));

        this.axisColour = color(0,0,0);
        this.barColor = color(135, 226, 35, 100);
        this.axisTextColour= color(0);
    }




        renderBars(){

        }

        renderAxis(){

        }

        renderTicks(){
            push()
            translate(this.chartPosX,this.chartPosY)
            noFill()
            stroke(this.axisColour)
            strokeWeight(this.axisThickness)
            
            for (let i=0; i< this.numTicks; i++){
                line (0,0,-10,0)
            }

            pop()
        }
        render(){
        
    //         push()
    //         translate(this.chartPosX,this.chartPosY)
    //         noFill()
    //         stroke(this.axisColour)
    //         strokeWeight(this.axisThickness)
    //         line (0,0,0,-this.chartHeight) // x axis
    //         line (0,0,this.chartWidth,0) //y axis
        
        
    //         push()
    //         translate(this.margin,0)
    //         for(let i = 0; i < this.data.length; i++){
    //             let xPos = (this.barWidth + this.gap)* i;
    //             fill(this.barColor)
    //             rect (xPos, 0, this.barWidth, -this.data[i][this.yValue]*this.scaler)
                
    //             fill(this.axisTextColour)
    //             noStroke()
    //             textAlign(LEFT)
    //             textSize (9)
    //             push()
    //             translate(xPos + (this.barWidth/2),15)
    //             rotate(45)
    //             text (this.data[i][this.xValue],10,0);
    //             pop()
            
            
    //         }
    //     pop()
        
    // pop()
        

        }
    }


