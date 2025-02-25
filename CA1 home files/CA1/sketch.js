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
    createCanvas(1800, 3200);

    angleMode(DEGREES);
    noLoop();

    // Process and clean data
    cleanedData = data.rows.map(row => {
        let name = row.get("Name");
        let streams = parseFloat(row.getNum("Streams").toFixed(2));
        let danceability = parseFloat(row.getNum("Danceability"));
        let energy = parseFloat(row.getNum("Energy"));
        let duration = parseFloat(row.getNum("Duration"));
        let valence = parseFloat(row.getNum("Valence"));
        let tempo = parseFloat(row.getNum("Tempo"));

        console.log(name, streams, danceability, energy, duration, valence, tempo);

        return { Name: name, Streams: streams, Danceability: danceability, Energy: energy, Duration: duration, Valence: valence, Tempo: tempo };
    });

    cleanedData.sort((a, b) => b.Streams - a.Streams); // Sort by streams
    cleanedData = cleanedData.slice(0, 15); // Keep only top 15 songs

    // Create various charts
    charts.push(new BarChart({
        data: cleanedData,
        xValue: "Name",
        yValue: "Streams",
    }));

    charts.push(new BarChart({
        data: cleanedData,
        xValue: "Streams",
        yValue: "Energy",
        chartPosX: 500,
        chartPosY: 3000,

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

    // Select top 3 songs for the Double Pie Chart (Tempo & Valence)
    let top3Songs = cleanedData.slice(0, 3);
    let top3Outer = top3Songs.map(song => song.Tempo);
    let top3Inner = top3Songs.map(song => song.Valence);
    let top3Names = top3Songs.map(song => song.Name);

    charts.push(new PieChart({
        outerData: top3Outer,
        innerData: top3Inner,
        outerLabels: top3Names,
        innerLabels: top3Names,
        chartPosX: 900,
        chartPosY: 2000,
        title: "Tempo and Valence for Top 3 Songs",
        outerTitle: "Tempo (BPM)",
        innerTitle: "Valence (Positivity)"
    }));
}

function draw() {
    background(255);

    if (charts.length > 0) {

        let barChart1 = charts[0];
        barChart1.renderAxis();
        barChart1.renderBars();
        barChart1.renderLabels();
        barChart1.renderTicks();
        barChart1.renderTitle("Top 15 Most Streamed Songs of All Time");
        barChart1.renderAxisTitles("Song Title", "Total Streams (in Billions)");

        // second bar chart
        let barChart2 = charts[1];
        barChart2.renderAxis();
        barChart2.renderBars();
        barChart2.renderLabels();
        barChart2.renderTicks();
        barChart2.renderTitle("Top 15 Most Streamed Songs and their Energy Levels");
        barChart2.renderAxisTitles("Streams", "Energy");


        let stackedBarChart = charts[2];  
        stackedBarChart.renderAxis();
        stackedBarChart.renderBars();
        stackedBarChart.renderLabels();
        stackedBarChart.renderTicks();
        stackedBarChart.renderTitle("Top 15 Most Streamed Songs and their Danceability/Energy");
        stackedBarChart.renderAxisTitles("Song Title", "Level of Energy/Danceability");
        stackedBarChart.renderLegend(["Danceability", "Energy"], stackedBarChart.barColours);


        let clusterBarChart = charts[3]; 
        clusterBarChart.renderAxis();
        clusterBarChart.renderBars();
        clusterBarChart.renderLabels();
        clusterBarChart.renderTicks();
        clusterBarChart.renderTitle("Top 15 most streamed songs and their Duration/Streams");
        clusterBarChart.renderAxisTitles("Song Title", "Duration/Streams");
        clusterBarChart.renderLegend(clusterBarChart.barColours);


        let horizontalBarChart = charts[4];
        horizontalBarChart.renderAxis();
        horizontalBarChart.renderBars();
        horizontalBarChart.renderLabels();
        horizontalBarChart.renderTicks();
        horizontalBarChart.renderTitle("Top 15 Most Streamed Songs of All Time");
        horizontalBarChart.renderAxisTitles("Song Title", "Total Streams (in Billions)");
        

        let pieChart = charts[5];
        pieChart.renderPie();
        pieChart.renderTitle();
        pieChart.renderLegend();
    } else {
        console.error("No charts found.");
    }
}

