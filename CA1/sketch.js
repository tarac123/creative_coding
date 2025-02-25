let data;
let cleanedData = [];
let charts = []; 

function preload() {
    data = loadTable('data/csv/Features.csv', 'csv', 'header', function() {
        console.log('CSV file loaded');
        
    }, function(error) {
        console.error('Error loading CSV:', error);
    });
}

function setup() {
    createCanvas(1800, 2400);
    angleMode(DEGREES);
    noLoop();

    // this function correctly processes data
    cleanedData = data.rows.map(row => {
        let name = row.get("Name");
        let streams = parseFloat(row.getNum("Streams").toFixed(2));
        let danceability = parseFloat(row.getNum("Danceability"));
        let energy = parseFloat(row.getNum("Energy"));
        let duration = parseFloat(row.getNum("Duration"));
      

        console.log(name, streams, danceability, energy, duration); // Check values for debugging

        return { Name: name, Streams: streams, Danceability: danceability, Energy: energy, Duration: duration };
    });

    cleanedData.sort((a, b) => b.Streams - a.Streams); // Sort descending by Streams
    cleanedData = cleanedData.slice(0, 15); // Keep only top 15


    charts.push(new BarChart({
        data: cleanedData,
        xValue: "Name",
        yValue: "Streams",
    }));

    charts.push(new StackedBarChart({
        data: cleanedData,
        xValue: "Name",  
        yValues: ["Danceability", "Energy"]
    }));

    charts.push(new ClusterBarChart({
        data: cleanedData,
        xValue: "Name",
        yValues: ["Duration", "Streams"],
    }));

    charts.push(new HorizontalBarChart({
        data: cleanedData,
        xValue: "Streams",
        yValue: "Name",
    }));

}

function draw() {
    background(255);

    // Render the BarChart
    if (charts.length > 0) {
        let barChart = charts[0];
        barChart.renderAxis();
        barChart.renderBars();
        barChart.renderLabels();
        barChart.renderTicks();
        barChart.renderTitle("Top 15 Most Streamed Songs of All Time");
        barChart.renderAxisTitles("Song Title", "Total Streams (in Billions)");

        // Render the StackedBarChart
        let stackedBarChart = charts[1];  
        stackedBarChart.renderAxis();     // Call the renderAxis method
        stackedBarChart.renderBars();     // Call the renderBars method
        stackedBarChart.renderLabels();   // Call the renderLabels method
        stackedBarChart.renderTicks();    // Call the renderTicks method
        stackedBarChart.renderTitle("Top 15 Most Streamed Songs and their Danceability/Energy");
        stackedBarChart.renderAxisTitles("Song Title", "Level of Energy/Danceability");
        stackedBarChart.renderLegend(["Danceability", "Energy"], stackedBarChart.barColours);

        let clusterBarChart = charts[2]; 
        clusterBarChart.renderAxis();     // Call the renderAxis method
        clusterBarChart.renderBars();     // Call the renderBars method
        clusterBarChart.renderLabels();   // Call the renderLabels method
        clusterBarChart.renderTicks();    // Call the renderTicks method
        clusterBarChart.renderTitle("Top 15 most streamed songs and their Duration/Streams");
        clusterBarChart.renderAxisTitles("Song Title", "Duration/Streams");
        clusterBarChart.renderLegend(["Duration (mins)", "Streams (Billions)"], clusterBarChart.barColours);

        let horizontalBarChart = charts[3];
        horizontalBarChart.renderAxis();
        horizontalBarChart.renderBars();
        horizontalBarChart.renderLabels();
        horizontalBarChart.renderTicks();
        horizontalBarChart.renderTitle("Top 15 Most Streamed Songs of All Time");
        horizontalBarChart.renderAxisTitles("Song Title", "Total Streams (in Billions)");

    
    } else {
        console.error("No charts found.");
    }
}
